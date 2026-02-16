"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/services/api";
import { formatRelativeTime } from "@/utils/format";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

export default function RecentJobs() {
  const router = useRouter();
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    fetchRecentJobs();
    const interval = setInterval(() => {
      fetchRecentJobs();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentJobs = async () => {
    try {
      // Jobs are managed by server cron - return empty for now
      setRecentJobs([]);
    } catch (err) {
      setRecentJobs([]);
    }
  };

  const handleViewJob = (job) => {
    if (job.coverage?.id) {
      router.push(`/dashboard/ads?coverageId=${job.coverage.id}`);
    }
  };

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
      <span className={`${config.bg} ${config.text} px-2 py-1 rounded-full text-xs font-medium`}>
        {config.label}
      </span>
    );
  };


  // Show section even if no jobs, but with a message
  if (recentJobs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <i className="ri-history-line text-[#26996f]"></i>
            Recent Jobs
          </h3>
          <button
            onClick={() => router.push('/dashboard/history')}
            className="text-sm text-[#26996f] hover:underline font-medium"
          >
            View All
          </button>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No recent jobs yet. Start a search to see results here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <i className="ri-history-line text-[#26996f]"></i>
          Recent Jobs
        </h3>
        <button
          onClick={() => router.push('/dashboard/history')}
          className="text-xs sm:text-sm text-[#26996f] hover:underline font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {recentJobs.map((job) => {
          const adsCount = job.coverage?.isComplete 
            ? (job.adsScraped || job.coverage?.totalAds || 0)
            : (job.adsScraped || 0);

          return (
            <div
              key={job.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0">
                    {getStatusBadge(job.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {job.coverage?.keyword || "N/A"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <span className="hidden sm:inline">{job.coverage?.country || "N/A"} • {job.coverage?.dateStart || "—"} to {job.coverage?.dateEnd || "—"}</span>
                      <span className="sm:hidden">{job.coverage?.country || "N/A"} • {job.coverage?.dateStart || "—"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <i className="ri-file-list-3-line"></i>
                    {adsCount} ads
                  </span>
                  {job.status === 'running' && job.coverage?.coveragePercentage !== undefined && (
                    <span className="flex items-center gap-1 text-purple-600 font-medium">
                      <i className="ri-time-line"></i>
                      {job.coverage.coveragePercentage}% complete
                    </span>
                  )}
                  {job.status === 'running' && job.currentPage && (
                    <span className="flex items-center gap-1 text-purple-600">
                      Page {job.currentPage}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line"></i>
                    {formatRelativeTime(job.createdAt)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleViewJob(job)}
                disabled={!job.coverage?.id || adsCount === 0}
                className="w-full sm:w-auto sm:ml-4 px-4 py-2 bg-[#26996f] text-white rounded-lg hover:bg-[#26996f] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium whitespace-nowrap"
              >
                View Ads
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

