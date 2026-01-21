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
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Scrape History
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          View all your scraping jobs, statuses, and extracted row counts.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <input
          type="text"
          placeholder="Search by Job ID, Keyword, or Country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 md:w-80 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#26996f] transition"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26996f]"
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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#26996f]"></div>
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
            <>
              {/* Desktop Table View - Hidden on mobile */}
              <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden w-full" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                <div className="overflow-x-auto overflow-y-auto w-full h-full" style={{ scrollbarWidth: 'thin' }}>
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
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
                                      className="bg-[#26996f] h-2 rounded-full transition-all duration-300"
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
                                className="px-4 py-2 bg-[#26996f] text-white rounded-lg hover:bg-[#26996f] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
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

              {/* Mobile Card View - Visible on mobile */}
              <div className="md:hidden space-y-4">
                {filteredJobs.map((job) => {
                  const thumbnail = job.coverage?.id ? thumbnails[job.coverage.id] : null;
                  const adsCount = job.coverage?.isComplete
                    ? (job.adsScraped || job.coverage?.totalAds || 0)
                    : (job.adsScraped || 0);

                  return (
                    <div
                      key={job.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                    >
                      {/* Card Header */}
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-start gap-3">
                          {/* Thumbnail */}
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

                          {/* Title and Status */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h3 className="text-base font-semibold text-gray-900 truncate">
                                {job.coverage?.keyword || "N/A"}
                              </h3>
                              {getStatusBadge(job.status)}
                            </div>
                            <p className="text-xs text-gray-500 truncate mb-2">
                              {job.id}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {job.coverage?.country || "N/A"}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatRelativeTime(job.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 space-y-3">
                        {/* Date Range */}
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <span className="text-xs text-gray-500 font-medium">Date Range</span>
                          <div className="text-right">
                            <div className="text-sm text-gray-900">
                              {job.coverage?.dateStart || "—"}
                            </div>
                            <div className="text-xs text-gray-500">
                              to {job.coverage?.dateEnd || "—"}
                            </div>
                          </div>
                        </div>

                        {/* Ads Found */}
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                          <span className="text-xs text-gray-500 font-medium">Ads Found</span>
                          <div className="text-sm font-semibold text-gray-900">
                            {job.coverage?.isComplete ? (
                              adsCount
                            ) : (
                              <span className="text-gray-400">{adsCount}</span>
                            )}
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="py-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 font-medium">Progress</span>
                            {job.status === 'running' && (
                              <span className="text-xs text-gray-600">
                                Page {job.currentPage || 0}
                              </span>
                            )}
                          </div>
                          {job.status === 'running' ? (
                            <div>
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Processing...</span>
                                <span className="font-medium">
                                  {job.coverage?.coveragePercentage !== undefined
                                    ? `${job.coverage.coveragePercentage}%`
                                    : '0%'}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-[#26996f] h-2 rounded-full transition-all duration-300"
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
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleViewAds(job)}
                          disabled={!job.coverage?.id || job.adsScraped === 0}
                          className="w-full mt-4 px-4 py-2.5 bg-[#26996f] text-white rounded-lg hover:bg-[#26996f] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          View Ads
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

    </div>
  );
}
