"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/services/api";
import { formatRelativeTime } from "@/utils/format";
import { getAdsByCoverage } from "@/services/ads.service";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

export default function History() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbnails, setThumbnails] = useState({}); // Store thumbnails by coverageId

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      params.append('limit', '100');
      
      const response = await get(`/ads/jobs?${params.toString()}`);
      
      // Handle response structure: { data: { jobs: [...] }, ... }
      if (response && response.data) {
        const fetchedJobs = response.data.jobs || [];
        setJobs(fetchedJobs);

        // Fetch thumbnails for completed jobs
        fetchThumbnails(fetchedJobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message || 'Failed to load job history');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      job.id.toLowerCase().includes(searchLower) ||
      job.coverage?.keyword?.toLowerCase().includes(searchLower) ||
      job.coverage?.country?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: "bg-green-100", text: "text-green-700", label: "Completed" },
      running: { bg: "bg-purple-100", text: "text-purple-700", label: "Running" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
      failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" },
      paused: { bg: "bg-orange-100", text: "text-orange-700", label: "Paused" }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-medium`}>
        {config.label}
      </span>
    );
  };

  // Fetch thumbnail for each job's first ad
  const fetchThumbnails = async (jobsList) => {
    const thumbnailPromises = jobsList
      .filter(job => job.coverage?.id && job.coverage?.isComplete && job.adsScraped > 0)
      .map(async (job) => {
        try {
          const response = await getAdsByCoverage(job.coverage.id, { limit: 1, offset: 0 });
          if (response.code === 200 && response.data?.ads?.length > 0) {
            const firstAd = response.data.ads[0];
            return {
              coverageId: job.coverage.id,
              thumbnail: firstAd.thumbnail_url || firstAd.video_url || null
            };
          }
        } catch (err) {
          // Silently handle thumbnail errors - not critical for functionality
        }
        return { coverageId: job.coverage.id, thumbnail: null };
      });

    const results = await Promise.all(thumbnailPromises);
    const thumbnailMap = {};
    results.forEach(({ coverageId, thumbnail }) => {
      if (coverageId) {
        thumbnailMap[coverageId] = thumbnail;
      }
    });
    setThumbnails(prev => ({ ...prev, ...thumbnailMap }));
  };

  // Handle view ads button click - navigate to ads page with query parameter
  const handleViewAds = (job) => {
    if (!job.coverage?.id) {
      alert('Coverage ID not found for this job');
      return;
    }
    router.push(`/dashboard/ads?coverageId=${job.coverage.id}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Scrape History
        </h1>
        <p className="text-gray-500 mt-1">
          View all your scraping jobs, statuses, and extracted row counts.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Job ID, Keyword, or Country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] transition"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#433974]"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="running">Running</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#433974]"></div>
          <p className="mt-4 text-gray-500">Loading job history...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              <p className="text-lg">No jobs found</p>
              <p className="text-sm mt-2">Start a search to see job history here</p>
            </div>
          ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Thumbnail
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Keyword
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Date Range
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Ads Found
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredJobs.map((job) => {
                        const thumbnail = job.coverage?.id ? thumbnails[job.coverage.id] : null;
                        const adsCount = job.coverage?.isComplete
                          ? (job.adsScraped || job.coverage?.totalAds || 0)
                          : (job.adsScraped || 0);

                        return (
                          <tr
                            key={job.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            {/* Thumbnail */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {thumbnail ? (
                                  <img
                                    src={thumbnail}
                                    alt={job.coverage?.keyword || "Ad thumbnail"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div
                                  className={`w-full h-full flex items-center justify-center ${thumbnail ? 'hidden' : 'flex'}`}
                                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                                >
                                  <div className="text-white text-xl font-bold">
                                    {job.coverage?.keyword?.charAt(0)?.toUpperCase() || 'A'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Keyword */}
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {job.coverage?.keyword || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {job.id}
                              </div>
                            </td>

                            {/* Country */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {job.coverage?.country || "N/A"}
                              </div>
                            </td>

                            {/* Date Range */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {job.coverage?.dateStart || "—"}
                              </div>
                              <div className="text-xs text-gray-500">
                                to {job.coverage?.dateEnd || "—"}
                              </div>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(job.status)}
                            </td>

                            {/* Ads Found */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {job.coverage?.isComplete ? (
                                  adsCount
                                ) : (
                                  <span className="text-gray-400">{adsCount}</span>
                                )}
                              </div>
                            </td>

                            {/* Progress */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              {job.status === 'running' ? (
                                <div className="w-32">
                                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                    <span>Page {job.currentPage || 0}</span>
                                    <span className="font-medium">
                                      {job.coverage?.coveragePercentage !== undefined
                                        ? `${job.coverage.coveragePercentage}%`
                                        : '0%'}
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                      className="bg-[#433974] h-2 rounded-full transition-all duration-300"
                                      style={{
                                        width: `${job.coverage?.coveragePercentage || 0}%`,
                                        minWidth: job.coverage?.coveragePercentage > 0 ? '2px' : '0'
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              ) : job.coverage?.isComplete ? (
                                <div className="text-xs text-green-600 font-medium">
                                  100% Complete
                                </div>
                                ) : job.status === 'failed' ? (
                                  <div className="text-xs text-red-600 font-medium">
                                    Failed
                                  </div>
                                  ) : (
                                    <div className="text-xs text-gray-400">—</div>
                              )}
                            </td>

                            {/* Created */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {formatRelativeTime(job.createdAt)}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleViewAds(job)}
                                disabled={!job.coverage?.id || job.adsScraped === 0}
                                className="px-4 py-2 bg-[#433974] text-white rounded-lg hover:bg-[#5145a3] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                              >
                                View Ads
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
          )}
        </>
      )}

    </div>
  );
}
