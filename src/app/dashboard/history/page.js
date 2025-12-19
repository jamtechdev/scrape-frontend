"use client";

import { useState, useEffect } from "react";
import { get } from "@/services/api";
import { formatRelativeTime } from "@/utils/format";
import { getAdsByCoverage } from "@/services/ads.service";
import AdCard from "@/components/dashboard/AdCard";

export default function History() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ads modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [ads, setAds] = useState([]);
  const [adsLoading, setAdsLoading] = useState(false);
  const [adsError, setAdsError] = useState(null);
  const [showAdsModal, setShowAdsModal] = useState(false);

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
        setJobs(response.data.jobs || []);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      // More detailed error message
      if (err.status === 0) {
        setError('Network error: Could not connect to server. Please check if the backend is running.');
      } else if (err.status === 401) {
        setError('Authentication required. Please log in again.');
      } else {
        setError(err.message || `Failed to load job history (${err.status || 'Unknown error'})`);
      }
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

  const formatJobInfo = (job) => {
    if (!job.coverage) return "N/A";
    const { keyword, country, dateStart, dateEnd } = job.coverage;
    return `${keyword} (${country}) - ${dateStart} to ${dateEnd}`;
  };

  // Handle job click to show ads
  const handleJobClick = async (job) => {
    if (!job.coverage?.id) {
      setAdsError('Coverage ID not found for this job');
      return;
    }

    setSelectedJob(job);
    setShowAdsModal(true);
    setAds([]);
    setAdsError(null);
    setAdsLoading(true);

    try {
      // Fetch all ads for this coverage (fetch in batches)
      const allAds = [];
      let offset = 0;
      const limit = 100;
      let hasMore = true;

      while (hasMore) {
        const response = await getAdsByCoverage(job.coverage.id, { limit, offset });
        
        if (response.code === 200 && response.data) {
          const fetchedAds = response.data.ads || [];
          allAds.push(...fetchedAds);
          
          // Check if there are more ads
          const totalAds = response.data.coverage?.totalAds || 0;
          if (allAds.length >= totalAds || fetchedAds.length < limit) {
            hasMore = false;
          } else {
            offset += limit;
          }
        } else {
          hasMore = false;
        }
      }

      setAds(allAds);
    } catch (err) {
      console.error('Error fetching ads:', err);
      setAdsError(err.message || 'Failed to load ads');
    } finally {
      setAdsLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowAdsModal(false);
    setSelectedJob(null);
    setAds([]);
    setAdsError(null);
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
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No jobs found</p>
              <p className="text-sm mt-2">Start a search to see job history here</p>
            </div>
          ) : (
            <table className="min-w-full text-md">
              <thead>
                <tr className="bg-[#433974] text-white">
                  <th className="py-4 px-4 text-left font-semibold">Job ID</th>
                  <th className="py-4 px-4 text-left font-semibold">Keyword & Details</th>
                  <th className="py-4 px-4 text-left font-semibold">Status</th>
                  <th className="py-4 px-4 text-left font-semibold">Ads Found</th>
                  <th className="py-4 px-4 text-left font-semibold">Progress</th>
                  <th className="py-4 px-4 text-left font-semibold">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr 
                    key={job.id} 
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => handleJobClick(job)}
                  >
                    <td className="py-4 px-4 font-medium text-gray-800 font-mono text-sm">
                      {job.id.substring(0, 8)}...
                    </td>
                    <td className="py-4 px-4">
                      <div className="max-w-[300px]">
                        <div className="font-medium text-gray-800 truncate">
                          {job.coverage?.keyword || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.coverage?.country} • {job.coverage?.dateStart} to {job.coverage?.dateEnd}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(job.status)}
                    </td>
                    <td className="py-4 px-4">
                      {job.coverage?.isComplete ? (
                        <span className="font-medium">{job.adsScraped || job.coverage?.totalAds || 0}</span>
                      ) : (
                        <span className="text-gray-400">{job.adsScraped || 0}</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {job.status === 'running' ? (
                        <div className="text-sm">
                          <div className="text-gray-600">Page {job.currentPage || 0}</div>
                          {job.coverage?.coveragePercentage !== undefined && (
                            <div className="text-gray-500">{job.coverage.coveragePercentage}%</div>
                          )}
                        </div>
                      ) : job.coverage?.isComplete ? (
                        <span className="text-green-600 font-medium">100%</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {formatRelativeTime(job.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Ads Modal */}
      {showAdsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Ads for "{selectedJob.coverage?.keyword || 'N/A'}"
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedJob.coverage?.country} • {selectedJob.coverage?.dateStart} to {selectedJob.coverage?.dateEnd}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition p-2"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {adsLoading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#433974]"></div>
                  <p className="mt-4 text-gray-500">Loading ads...</p>
                </div>
              )}

              {adsError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {adsError}
                </div>
              )}

              {!adsLoading && !adsError && ads.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No ads found</p>
                  <p className="text-sm mt-2">This job may still be in progress or no ads were found.</p>
                </div>
              )}

              {!adsLoading && !adsError && ads.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Showing {ads.length} {ads.length === 1 ? 'ad' : 'ads'}
                    </p>
                    {selectedJob.coverage?.isComplete && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ads.map((ad) => (
                      <AdCard key={ad.id} ad={ad} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#433974] text-white rounded-lg hover:bg-[#5145a3] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
