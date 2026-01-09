"use client";
import { useState, useEffect } from "react";
import { getAdsByCoverage } from "@/services/ads.service";
import { formatRelativeTime } from "@/utils/format";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

export default function FacebookAdsFeed({ coverageId, onClose, jobInfo }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const [expandedAd, setExpandedAd] = useState(null);
  const adsPerPage = 10;

  useEffect(() => {
    if (coverageId) {
      fetchAds(currentPage);
    }
  }, [coverageId, currentPage]);

  const fetchAds = async (page) => {
    if (!coverageId) {
      setError('Coverage ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const offset = (page - 1) * adsPerPage;
      const response = await getAdsByCoverage(coverageId, { 
        limit: adsPerPage, 
        offset 
      });
      
      if (response.code === 200 && response.data) {
        setAds(response.data.ads || []);
        const total = response.data.coverage?.totalAds || 0;
        setTotalAds(total);
        setTotalPages(Math.ceil(total / adsPerPage));
      } else {
        setError('Failed to load ads');
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message || 'Failed to load ads');
    } finally {
      setLoading(false);
    }
  };

  const getClassificationBadge = (classification) => {
    const config = {
      YES: { bg: "bg-green-100", text: "text-green-700", label: "YES" },
      NO: { bg: "bg-red-100", text: "text-red-700", label: "NO" },
      UNSURE: { bg: "bg-yellow-100", text: "text-yellow-700", label: "UNSURE" }
    };
    const badgeConfig = config[classification] || null;
    if (!badgeConfig) return null;
    return (
      <span className={`${badgeConfig.bg} ${badgeConfig.text} px-2 py-1 rounded text-xs font-medium ml-2`}>
        {badgeConfig.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      return formatRelativeTime(dateString);
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Ads Feed
            </h2>
            {jobInfo && (
              <p className="text-sm text-gray-500 mt-1">
                {jobInfo.keyword} • {jobInfo.country} • {jobInfo.dateStart} to {jobInfo.dateEnd}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {loading && currentPage === 1 && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#433974]"></div>
              <p className="mt-4 text-gray-500">Loading ads...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {!loading && !error && ads.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No ads found</p>
              <p className="text-sm mt-2">This job may still be in progress or no ads were found.</p>
            </div>
          )}

          {!loading && ads.length > 0 && (
            <div className="space-y-4">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Ad Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {ad.page_name ? ad.page_name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900">
                              {ad.page_name || "Unknown Advertiser"}
                            </h3>
                            {getClassificationBadge(ad.classified_category)}
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatDate(ad.created_at || ad.ad_delivery_start_time)}
                          </p>
                        </div>
                      </div>
                      {ad.ad_snapshot_url && (
                        <a
                          href={ad.ad_snapshot_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#433974] hover:underline"
                        >
                          View on Facebook →
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Ad Content */}
                  <div className="p-4">
                    {ad.ad_creative_link_title && (
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {ad.ad_creative_link_title}
                      </h4>
                    )}
                    
                    {ad.ad_creative_body && (
                      <p className={`text-gray-700 mb-3 ${expandedAd === ad.id ? '' : 'line-clamp-3'}`}>
                        {ad.ad_creative_body}
                      </p>
                    )}

                    {ad.ad_creative_body && ad.ad_creative_body.length > 150 && (
                      <button
                        onClick={() => setExpandedAd(expandedAd === ad.id ? null : ad.id)}
                        className="text-sm text-[#433974] hover:underline mb-3"
                      >
                        {expandedAd === ad.id ? 'Show less' : 'See more'}
                      </button>
                    )}

                    {ad.ad_creative_link_description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {ad.ad_creative_link_description}
                      </p>
                    )}

                    {/* Media */}
                    {(ad.thumbnail_url || ad.video_url) && (
                      <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                        {ad.video_url ? (
                          <video
                            controls
                            className="w-full h-auto max-h-96"
                            poster={ad.thumbnail_url || undefined}
                            onError={(e) => {
                              // Silently handle video load errors - fallback UI handles it
                              e.target.style.display = 'none';
                            }}
                          >
                            <source src={ad.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : ad.thumbnail_url ? (
                          <img
                            src={ad.thumbnail_url}
                            alt="Ad thumbnail"
                            className="w-full h-auto max-h-96 object-contain"
                            onError={(e) => {
                              // Silently handle image load errors - fallback UI handles it
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : null}
                      </div>
                    )}

                    {/* Landing Page Link */}
                    {ad.landing_page_url && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <a
                          href={ad.landing_page_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#433974] hover:underline flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visit Landing Page
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Ad Footer (Facebook-like actions) */}
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>Sponsored</span>
                      {ad.impressions && (
                        <span>• {ad.impressions} impressions</span>
                      )}
                    </div>
                    {ad.ad_delivery_start_time && ad.ad_delivery_stop_time && (
                      <span className="text-xs">
                        {new Date(ad.ad_delivery_start_time).toLocaleDateString()} - {new Date(ad.ad_delivery_stop_time).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {!loading && ads.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * adsPerPage) + 1} - {Math.min(currentPage * adsPerPage, totalAds)} of {totalAds} ads
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

