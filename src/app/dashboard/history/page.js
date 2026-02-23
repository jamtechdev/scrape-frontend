"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get, post } from "@/services/api";
import { formatRelativeTime } from "@/utils/format";
import { getAdsByCoverage } from "@/services/ads.service";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

export default function History() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [thumbnails, setThumbnails] = useState({}); // Store thumbnails by coverageId

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const fetchJobs = async () => {
    try {
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('limit', '1000'); // Get all jobs
      params.append('offset', '0');
      if (statusFilter) {
        params.append('status', statusFilter);
      }
      
      const response = await get(`/ads/jobs?${params.toString()}`);
      
      // Handle response structure: { data: { jobs: [...], pagination: {...} }, ... }
      if (response && response.data) {
        const fetchedJobs = response.data.jobs || [];
        setJobs(fetchedJobs);
        
        // Fetch thumbnails for completed jobs
        if (fetchedJobs.length > 0) {
          fetchThumbnails(fetchedJobs);
        }
      } else {
        setJobs([]);
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message || 'Failed to load job history');
      setJobs([]);
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

  // Handle pause job button click
  const handlePauseJob = async (job) => {
    try {
      const response = await post(`/ads/jobs/${job.id}/pause`);
      if (response.code === 200) {
        // Refresh jobs list
        await fetchJobs();
        alert('Job paused successfully! The scraping will stop.');
      }
    } catch (err) {
      // Check if it's a 401/403 error (session expired)
      if (err.status === 401 || err.status === 403) {
        alert('Your session has expired. Please login again.');
        // The API client will automatically handle logout and redirect
        return;
      }
      const errorInfo = handleApiError(err);
      alert(errorInfo.message || 'Failed to pause job');
    }
  };

  // Handle resume job button click
  const handleResumeJob = async (job) => {
    try {
      const response = await post(`/ads/jobs/${job.id}/resume`);
      if (response.code === 200) {
        // Refresh jobs list
        await fetchJobs();
        alert('Job resumed successfully! It will continue processing in the background.');
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      alert(errorInfo.message || 'Failed to resume job');
    }
  };

  // Check if job can be paused
  const canPauseJob = (job) => {
    return job.status === 'running' || job.status === 'pending';
  };

  // Check if job can be resumed (ALL paused and failed jobs can be resumed)
  const canResumeJob = (job) => {
    return job.status === 'paused' || job.status === 'failed';
  };


  return (
    <div>
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Search History
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          View all your search jobs, statuses, and extracted row counts.
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!error && (
        <>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              <p className="text-lg">No jobs found</p>
              <p className="text-sm mt-2">Start a search to see job history here</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View - Hidden on mobile */}
              <div className="hidden md:block bg-white rounded-xl border border-gray-200 w-full overflow-x-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)', scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 #f7fafc' }}>
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
                              <div className="flex items-center gap-2">
                                {canPauseJob(job) && (
                                  <button
                                    onClick={() => handlePauseJob(job)}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-medium"
                                  >
                                    Pause
                                  </button>
                                )}
                                {canResumeJob(job) && (
                                  <button
                                    onClick={() => handleResumeJob(job)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                  >
                                    Continue
                                  </button>
                                )}
                                <button
                                  onClick={() => router.push('/dashboard/ads/all')}
                                  className="px-4 py-2 bg-[#26996f] text-white rounded-lg hover:bg-[#1f7a5a] transition text-sm font-medium"
                                >
                                  All Ads
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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

                        {/* Action Buttons */}
                        <div className="mt-4 space-y-2">
                          {canPauseJob(job) && (
                            <button
                              onClick={() => handlePauseJob(job)}
                              className="w-full px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-medium"
                            >
                              Pause
                            </button>
                          )}
                          {canResumeJob(job) && (
                            <button
                              onClick={() => handleResumeJob(job)}
                              className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                            >
                              Continue
                            </button>
                          )}
                          <button
                            onClick={() => router.push('/dashboard/ads/all')}
                            className="w-full px-4 py-2.5 bg-[#26996f] text-white rounded-lg hover:bg-[#1f7a5a] transition text-sm font-medium"
                          >
                            All Ads
                          </button>
                        </div>
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
