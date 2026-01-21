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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setLoading(false);
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
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/dashboard/history')}
                className="text-gray-600 hover:text-gray-900 mb-2 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to History
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Ads Feed</h1>
              {jobInfo && (
                <p className="text-sm text-gray-500 mt-1">
                  {jobInfo.keyword} • {jobInfo.country} • {jobInfo.dateStart} to {jobInfo.dateEnd}
                </p>
              )}
            </div>
            {!loading && ads.length > 0 && (
              <div className="text-sm text-gray-600">
                {totalAds} {totalAds === 1 ? 'ad' : 'ads'} total
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading && currentPage === 1 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#26996f]"></div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {/* Media - Video Priority */}
                <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
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
        {!loading && ads.length > 0 && (
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
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

export default function AdsFeedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#26996f]"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <AdsFeedContent />
    </Suspense>
  );
}

