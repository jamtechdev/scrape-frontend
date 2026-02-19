"use client";

import { useState, useEffect } from "react";
import { getAllAds } from "@/services/ads.service";
import { handleApiError } from "@/utils/errorHandler";

export default function AllAdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const adsPerPage = 20;

  useEffect(() => {
    fetchAds(currentPage);
  }, [currentPage]);

  const fetchAds = async (page) => {
    try {
      setLoading(true);
      setError(null);
      
      const offset = (page - 1) * adsPerPage;
      const response = await getAllAds({ limit: adsPerPage, offset });
      
      if (response.code === 200 && response.data) {
        const fetchedAds = response.data.ads || [];
        setAds(fetchedAds);
        const total = response.data.pagination?.total || 0;
        setTotalAds(total);
        setTotalPages(Math.ceil(total / adsPerPage));
        console.log('📊 Fetched ads:', fetchedAds.length, 'Total:', total);
      } else {
        setError('Failed to load ads');
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message || 'Failed to load ads');
      console.error('Error fetching ads:', err);
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
    const item = config[classification] || null;
    if (!item) return null;
    return (
      <span className={`${item.bg} ${item.text} px-2 py-1 rounded-full text-xs font-medium`}>
        {item.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">All Ads</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Browse all scraped ads from all jobs
              </p>
            </div>
            {!loading && totalAds > 0 && (
              <div className="text-sm text-gray-600 whitespace-nowrap">
                {totalAds} {totalAds === 1 ? 'ad' : 'ads'} total
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#26996f]"></div>
            <p className="text-sm text-gray-500 mt-4">Loading ads...</p>
          </div>
        )}

        {!loading && !error && ads.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No ads found</p>
            <p className="text-sm mt-2">No ads have been scraped yet.</p>
          </div>
        )}

        {!loading && ads.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Media - Video Priority */}
                  <div className="w-full h-64 bg-gray-100 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    {/* Priority 1: Show video if video_url exists */}
                    {ad.video_url ? (
                      <video
                        className="ad-video w-full h-full object-cover"
                        src={ad.video_url}
                        poster={ad.thumbnail_url || undefined}
                        controls
                        muted={false}
                        playsInline
                        preload="metadata"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const thumbnailElement = e.target.parentElement.querySelector('.ad-thumbnail');
                          const fallback = e.target.parentElement.querySelector('.fallback-gradient');
                          if (ad.thumbnail_url && thumbnailElement) {
                            thumbnailElement.style.display = 'block';
                          } else if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      >
                        <source src={ad.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                    
                    {/* Priority 2: Show thumbnail if no video_url OR video failed */}
                    {(!ad.video_url || (ad.video_url && ad.thumbnail_url)) && ad.thumbnail_url ? (
                      <img
                        className={`ad-thumbnail w-full h-full object-cover ${ad.video_url ? 'hidden' : ''}`}
                        src={ad.thumbnail_url}
                        alt={ad.ad_creative_link_title || "Ad thumbnail"}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = e.target.parentElement.querySelector('.fallback-gradient');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback gradient - shown when no video and no thumbnail or both fail */}
                    {(!ad.video_url && !ad.thumbnail_url) && (
                      <div 
                        className="fallback-gradient w-full h-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                      >
                        <div className="text-white text-4xl font-bold">
                          {ad.page_name ? ad.page_name.charAt(0).toUpperCase() : 'A'}
                        </div>
                      </div>
                    )}
                    
                    {/* Video indicator - show if video exists */}
                    {ad.video_url && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Video
                      </div>
                    )}
                    
                    {/* Classification Badge */}
                    {ad.classified_category && (
                      <div className="absolute top-2 left-2">
                        {getClassificationBadge(ad.classified_category)}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Advertiser Name */}
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                        {ad.page_name || "Unknown Advertiser"}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {ad.ad_creative_link_caption || "Advertisement"}
                      </p>
                    </div>

                    {/* Ad Title */}
                    {ad.ad_creative_link_title && (
                      <h4 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2">
                        {ad.ad_creative_link_title}
                      </h4>
                    )}

                    {/* Ad Description */}
                    {ad.ad_creative_link_description && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3 ad-description-scroll">
                        {ad.ad_creative_link_description}
                      </p>
                    )}

                    {/* Ad Body */}
                    {ad.ad_creative_body && (
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {ad.ad_creative_body}
                      </p>
                    )}

                    {/* Rich Ad Data Display */}
                    {ad.rawAdData && (
                      <div className="mb-3 space-y-3">
                        {/* Reach Data */}
                        {ad.rawAdData.euTotalReach && (
                          <div className="border border-gray-200 rounded-lg p-2 bg-gradient-to-br from-green-50 to-emerald-50">
                            <div className="text-xs font-semibold text-gray-700 mb-1">EU Total Reach</div>
                            <div className="text-lg font-bold text-green-700">{ad.rawAdData.euTotalReach.toLocaleString()}</div>
                          </div>
                        )}

                        {/* Ad Cards/Variations */}
                        {ad.rawAdData.cards && ad.rawAdData.cards.length > 0 && (
                          <div className="border border-gray-200 rounded-lg p-2 bg-gradient-to-br from-purple-50 to-pink-50">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Ad Variations ({ad.rawAdData.cards.length})</div>
                            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                              {ad.rawAdData.cards.slice(0, 2).map((card, idx) => (
                                <div key={idx} className="bg-white rounded border border-gray-200 overflow-hidden">
                                  {card.resized_image_url && (
                                    <img
                                      src={card.resized_image_url}
                                      alt={card.title || `Card ${idx + 1}`}
                                      className="w-full h-16 object-cover"
                                      onError={(e) => e.target.style.display = 'none'}
                                    />
                                  )}
                                  {card.title && (
                                    <p className="text-xs font-medium text-gray-900 line-clamp-1 p-1">{card.title}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Link URL */}
                    {ad.ad_creative_link_url && (
                      <a
                        href={ad.ad_creative_link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#26996f] hover:underline truncate"
                      >
                        {ad.ad_creative_link_url}
                      </a>
                    )}

                    {/* Actions */}
                    <div className="mt-auto pt-3 border-t border-gray-100 space-y-2">
                      {ad.ad_snapshot_url && (
                        <a
                          href={ad.ad_snapshot_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center text-xs text-[#26996f] hover:underline py-1"
                        >
                          View on Facebook →
                        </a>
                      )}
                      {ad.landing_page_url && (
                        <a
                          href={ad.landing_page_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center text-xs text-gray-600 hover:text-[#26996f] py-1"
                        >
                          Visit Landing Page
                        </a>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {ad.last_seen_at 
                          ? new Date(ad.last_seen_at).toLocaleDateString()
                          : 'N/A'}
                      </span>
                      {ad.is_active !== undefined && (
                        <span className={ad.is_active ? "text-green-600" : "text-gray-400"}>
                          {ad.is_active ? "Active" : "Inactive"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({totalAds} total)
                  </span>
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
