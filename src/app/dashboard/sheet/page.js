"use client";

import { useState, useEffect } from "react";
import { get } from "@/services/api";
import { formatRelativeTime } from "@/utils/format";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

export default function Sheets() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [allSheets, setAllSheets] = useState([]); // Store all fetched sheets
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(50); // Items per page

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    try {
      setError(null);
      
      // Fetch all sheets with a high limit to get everything
      const params = new URLSearchParams();
      params.append('limit', '1000'); // Increased limit to get all sheets
      params.append('offset', '0');
      
      const response = await get(`/ads/sheets?${params.toString()}`);
      
      // Handle response structure: { data: { sheets: [...], pagination: {...} }, ... }
      if (response && response.data) {
        const fetchedSheets = response.data.sheets || [];
        setAllSheets(fetchedSheets);
        setTotalCount(response.data.pagination?.total || fetchedSheets.length);
        console.log(`✅ Loaded ${fetchedSheets.length} Google Sheets (Total: ${response.data.pagination?.total || fetchedSheets.length})`);
      } else {
        setAllSheets([]);
        setTotalCount(0);
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message || 'Failed to load sheets');
      setAllSheets([]);
      setTotalCount(0);
    }
  };

  // Filter sheets based on search and filter criteria
  const filteredSheets = allSheets.filter((sheet) => {
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        sheet.title?.toLowerCase().includes(searchLower) ||
        sheet.jobId?.toLowerCase().includes(searchLower) ||
        sheet.coverage?.keyword?.toLowerCase().includes(searchLower) ||
        sheet.coverage?.country?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filter by date (recent/older)
    if (filter === 'recent') {
      const sheetDate = new Date(sheet.createdAt);
      const daysAgo = (Date.now() - sheetDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= 7; // Last 7 days
    } else if (filter === 'older') {
      const sheetDate = new Date(sheet.createdAt);
      const daysAgo = (Date.now() - sheetDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo > 7; // Older than 7 days
    }

    return true;
  });

  // Paginate filtered results
  const totalPages = Math.ceil(filteredSheets.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedSheets = filteredSheets.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const formatJobId = (jobId) => {
    if (!jobId) return '—';
    return `#${jobId.substring(0, 8)}...`;
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Generated Google Sheets
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          View all exported search results saved as Google Sheets.
          {totalCount > 0 && (
            <span className="ml-2 text-[#26996f] font-semibold">
              ({totalCount} {totalCount === 1 ? 'sheet' : 'sheets'})
            </span>
          )}
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
        <input
          type="text"
          placeholder="Search by Sheet name or Job ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 md:w-80 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#26996f] transition"
        />

        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#26996f]"
        >
          <option value="">All Sheets</option>
          <option value="recent">Recently Created</option>
          <option value="older">Older Sheets</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!error && (
        <>
          {filteredSheets.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
              <p className="text-lg">No sheets found</p>
              <p className="text-sm mt-2">
                {allSheets.length === 0 
                  ? 'Create a Google Sheet from a completed search job to see it here'
                  : 'No sheets match your search or filter criteria'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View - Hidden on mobile */}
              <div className="hidden md:block overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white w-full" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                <div className="overflow-x-auto overflow-y-auto w-full h-full" style={{ scrollbarWidth: 'thin' }}>
                  <table className="min-w-full text-md" >
                    <thead>
                      <tr className="bg-[#26996f] text-white sticky top-0 z-10">
                      <th className="py-4 px-4 text-left font-semibold">Sheet Name</th>
                      <th className="py-4 px-4 text-left font-semibold">Job ID</th>
                      <th className="py-4 px-4 text-left font-semibold">Rows</th>
                      <th className="py-4 px-4 text-left font-semibold">Created</th>
                      <th className="py-4 px-4 text-left font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {paginatedSheets.map((sheet) => (
                      <tr key={sheet.id} className="hover:bg-gray-50 transition">
                        <td className="py-4 px-4 text-[#000] font-medium truncate max-w-[220px]" title={sheet.title}>
                          {sheet.title || 'Untitled Sheet'}
                        </td>
                        <td className="py-4 px-4 text-gray-800 font-mono text-sm">
                          {formatJobId(sheet.jobId)}
                        </td>
                        <td className="py-4 px-4">{sheet.rows || 0}</td>
                        <td className="py-4 px-4 text-gray-500 text-sm">
                          {formatRelativeTime(sheet.createdAt)}
                        </td>
                        <td className="py-4 px-4">
                          {sheet.url ? (
                            <a
                              href={sheet.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-[#26996f] text-white rounded-lg text-sm font-medium hover:bg-[#26996f] transition inline-flex items-center gap-2"
                            >
                              <span>Open Sheet</span>
                              <i className="ri-external-link-line text-xs"></i>
                            </a>
                          ) : (
                            <button
                              disabled
                              className="px-3 py-1 bg-gray-300 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed"
                            >
                              No URL
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>

              {/* Mobile Card View - Visible on mobile */}
              <div className="md:hidden space-y-4">
                {paginatedSheets.map((sheet) => (
                  <div
                    key={sheet.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                  >
                    <div className="p-4 space-y-3">
                      {/* Sheet Name */}
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {sheet.title || 'Untitled Sheet'}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">
                          {formatJobId(sheet.jobId)}
                        </p>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-500 font-medium">Rows</span>
                          <p className="text-sm font-semibold text-gray-900 mt-0.5">
                            {sheet.rows || 0}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 font-medium">Created</span>
                          <p className="text-sm text-gray-900 mt-0.5">
                            {formatRelativeTime(sheet.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        {sheet.url ? (
                          <a
                            href={sheet.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block text-center px-4 py-2.5 bg-[#26996f] text-white rounded-lg hover:bg-[#26996f] transition text-sm font-medium inline-flex items-center justify-center gap-2"
                          >
                            <span>Open Sheet</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="w-full px-4 py-2.5 bg-gray-300 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed"
                          >
                            No URL Available
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 gap-4">
                    <div className="text-sm text-gray-700 text-center sm:text-left">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredSheets.length)} of {filteredSheets.length} sheets
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                                currentPage === pageNum
                                  ? 'bg-[#26996f] text-white'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
