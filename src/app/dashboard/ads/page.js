"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAdsByCoverage } from "@/services/ads.service";
import { formatRelativeTime } from "@/utils/format";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

function AdsFeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const coverageId = searchParams?.get('coverageId');
  
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const [expandedAd, setExpandedAd] = useState(null);
  const [jobInfo, setJobInfo] = useState(null);
  const adsPerPage = 20; // Increased for grid layout

  useEffect(() => {
    if (coverageId) {
      setCurrentPage(1); // Reset to first page when coverageId changes
      fetchAds(1);
    } else {
      setError('Coverage ID is required');
    }
  }, [coverageId]);

  useEffect(() => {
    if (coverageId) {
      fetchAds(currentPage);
    }
  }, [currentPage]);

  const fetchAds = async (page) => {
    if (!coverageId) {
      setError('Coverage ID is required');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      
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
        
        // Set job info from coverage data
        if (response.data.coverage) {
          setJobInfo({
            keyword: response.data.coverage.keyword,
            country: response.data.coverage.country,
            dateStart: response.data.coverage.dateStart,
            dateEnd: response.data.coverage.dateEnd
          });
        }
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
      return formatRelativeTime(dateString);
    } catch {
      return "Recently";
    }
  };

  if (!coverageId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Coverage ID is required</p>
          <button
            onClick={() => router.push('/dashboard/history')}
            className="px-4 py-2 bg-[#26996f] text-white rounded-lg hover:bg-[#26996f] transition"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <button
                onClick={() => router.push('/dashboard/history')}
                className="text-gray-600 hover:text-gray-900 mb-2 flex items-center gap-2 text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Back to History</span>
                <span className="sm:hidden">Back</span>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Ads Feed</h1>
              {jobInfo && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                  <span className="hidden sm:inline">{jobInfo.keyword} • {jobInfo.country} • {jobInfo.dateStart} to {jobInfo.dateEnd}</span>
                  <span className="sm:hidden">{jobInfo.keyword} • {jobInfo.country}</span>
                </p>
              )}
            </div>
            {ads.length > 0 && (
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
            <p className="text-sm mt-2">This job may still be in progress or no ads were found.</p>
          </div>
        )}

        {!loading && ads.length > 0 && (
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
                        // If video fails to load, hide video and show thumbnail or fallback
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
                      {formatDate(ad.created_at || ad.ad_delivery_start_time)}
                    </p>
                  </div>

                  {/* Title */}
                  {ad.ad_creative_link_title && (
                    <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                      {ad.ad_creative_link_title}
                    </h4>
                  )}

                  {/* Description */}
                  {ad.ad_creative_body && (
                    <div className="mb-2 flex-1 flex flex-col min-h-0">
                      <div 
                        className={`text-xs text-gray-600 overflow-y-auto ad-description-scroll ${expandedAd === ad.id ? 'max-h-32' : 'line-clamp-2'}`}
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#cbd5e0 transparent'
                        }}
                      >
                        {ad.ad_creative_body}
                      </div>
                      {ad.ad_creative_body.length > 100 && (
                        <button
                          onClick={() => setExpandedAd(expandedAd === ad.id ? null : ad.id)}
                          className="text-xs text-[#26996f] hover:underline mt-1 self-start"
                        >
                          {expandedAd === ad.id ? 'Show less' : 'See more'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Link Description */}
                  {ad.ad_creative_link_description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                      {ad.ad_creative_link_description}
                    </p>
                  )}

                  {/* Rich Ad Data Display */}
                  {ad.rawAdData && (
                    <div className="mb-3 space-y-3">
                      {/* Ad Cards/Variations */}
                      {ad.rawAdData.cards && ad.rawAdData.cards.length > 0 && (
                        <div className="border border-gray-200 rounded-lg p-3 bg-gradient-to-br from-purple-50 to-pink-50">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-xs font-semibold text-gray-700">Ad Variations ({ad.rawAdData.cards.length})</h5>
                            <span className="text-xs text-gray-500">DCO Format</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                            {ad.rawAdData.cards.slice(0, 4).map((card, idx) => (
                              <div key={idx} className="bg-white rounded border border-gray-200 overflow-hidden">
                                {card.resized_image_url && (
                                  <img 
                                    src={card.resized_image_url} 
                                    alt={card.title || `Card ${idx + 1}`}
                                    className="w-full h-20 object-cover"
                                    onError={(e) => e.target.style.display = 'none'}
                                  />
                                )}
                                <div className="p-2">
                                  {card.title && (
                                    <p className="text-xs font-medium text-gray-900 line-clamp-1 mb-1">{card.title}</p>
                                  )}
                                  {card.body && (
                                    <p className="text-xs text-gray-600 line-clamp-2">{card.body}</p>
                                  )}
                                  {card.cta_text && (
                                    <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                      {card.cta_text}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          {ad.rawAdData.cards.length > 4 && (
                            <p className="text-xs text-gray-500 mt-2 text-center">
                              +{ad.rawAdData.cards.length - 4} more variations
                            </p>
                          )}
                        </div>
                      )}

                      {/* Reach & Transparency Data */}
                      {ad.rawAdData.euTotalReach && (
                        <div className="border border-gray-200 rounded-lg p-3 bg-gradient-to-br from-green-50 to-emerald-50">
                          <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            EU Reach Data
                          </h5>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-white rounded p-2">
                              <div className="text-gray-500">Total Reach</div>
                              <div className="text-lg font-bold text-green-700">{ad.rawAdData.euTotalReach.toLocaleString()}</div>
                            </div>
                            {ad.rawAdData.ageAudience && (
                              <div className="bg-white rounded p-2">
                                <div className="text-gray-500">Age Range</div>
                                <div className="font-semibold text-gray-900">
                                  {ad.rawAdData.ageAudience.min}-{ad.rawAdData.ageAudience.max}
                                </div>
                              </div>
                            )}
                            {ad.rawAdData.genderAudience && (
                              <div className="bg-white rounded p-2">
                                <div className="text-gray-500">Gender</div>
                                <div className="font-semibold text-gray-900">{ad.rawAdData.genderAudience}</div>
                              </div>
                            )}
                            {ad.rawAdData.locationAudience && ad.rawAdData.locationAudience.length > 0 && (
                              <div className="bg-white rounded p-2 col-span-2">
                                <div className="text-gray-500 mb-1">Target Countries</div>
                                <div className="flex flex-wrap gap-1">
                                  {ad.rawAdData.locationAudience.slice(0, 8).map((loc, idx) => (
                                    <span key={idx} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                      {loc.name}
                                    </span>
                                  ))}
                                  {ad.rawAdData.locationAudience.length > 8 && (
                                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                      +{ad.rawAdData.locationAudience.length - 8} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Page Information */}
                      {(ad.rawAdData.pageName || ad.rawAdData.pageLikeCount || ad.rawAdData.pageCategories.length > 0) && (
                        <div className="border border-gray-200 rounded-lg p-3 bg-gradient-to-br from-blue-50 to-cyan-50">
                          <h5 className="text-xs font-semibold text-gray-700 mb-2">Page Information</h5>
                          <div className="space-y-1 text-xs">
                            {ad.rawAdData.pageName && (
                              <div className="flex items-center gap-2">
                                {ad.rawAdData.pageProfilePictureUrl && (
                                  <img 
                                    src={ad.rawAdData.pageProfilePictureUrl} 
                                    alt={ad.rawAdData.pageName}
                                    className="w-6 h-6 rounded-full"
                                    onError={(e) => e.target.style.display = 'none'}
                                  />
                                )}
                                <span className="font-medium text-gray-900">{ad.rawAdData.pageName}</span>
                                {ad.rawAdData.pageLikeCount && (
                                  <span className="text-gray-500">({ad.rawAdData.pageLikeCount.toLocaleString()} likes)</span>
                                )}
                              </div>
                            )}
                            {ad.rawAdData.pageCategories.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {ad.rawAdData.pageCategories.map((cat, idx) => (
                                  <span key={idx} className="text-xs px-2 py-0.5 bg-white text-gray-700 rounded border border-gray-200">
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Metadata */}
                      <details className="group">
                        <summary className="cursor-pointer flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200 hover:from-gray-100 hover:to-slate-100 transition-colors">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-600 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-xs font-semibold text-gray-700">Full Raw Data (JSON)</span>
                          </div>
                          <span className="text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                            {Object.keys(ad.rawAdData.fullRawData || {}).length} fields
                          </span>
                        </summary>
                        <div className="mt-2 p-3 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                          <div className="overflow-x-auto max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4b5563 #1f2937' }}>
                            <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap break-words">
                              {JSON.stringify(ad.rawAdData.fullRawData, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </details>
                    </div>
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
                    {ad.impressions && (
                      <p className="text-xs text-gray-400 text-center">
                        {ad.impressions} impressions
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {ads.length > 0 && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Showing {((currentPage - 1) * adsPerPage) + 1} - {Math.min(currentPage * adsPerPage, totalAds)} of {totalAds} ads
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default function AdsFeedPage() {
  return (
    <Suspense fallback={null}>
      <AdsFeedContent />
    </Suspense>
  );
}

