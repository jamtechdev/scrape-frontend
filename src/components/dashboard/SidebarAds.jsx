"use client";

import { useState, useEffect } from "react";
import { getAllAds } from "@/services/ads.service";
import { handleApiError } from "@/utils/errorHandler";

export default function SidebarAds({ isOpen }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const adsPerPage = 10;

  useEffect(() => {
    if (isOpen) {
      fetchAds(currentPage);
    }
  }, [isOpen, currentPage]);

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
    const item = config[classification] || null;
    if (!item) return null;
    return (
      <span className={`${item.bg} ${item.text} px-2 py-0.5 rounded-full text-xs font-medium`}>
        {item.label}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="mt-4 border-t border-white/20 pt-4">
      <div className="flex items-center justify-between mb-3 px-3">
        <h3 className="text-sm font-semibold text-white">All Ads</h3>
        {totalAds > 0 && (
          <span className="text-xs text-white/70">{totalAds} total</span>
        )}
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      )}

      {error && (
        <div className="px-3 py-2 bg-red-500/20 text-red-200 text-xs rounded mb-2">
          {error}
        </div>
      )}

      {!loading && !error && ads.length === 0 && (
        <div className="text-center py-4 text-white/60 text-xs">
          No ads found
        </div>
      )}

      <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto px-3" style={{ scrollbarWidth: 'thin' }}>
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-all cursor-pointer border border-white/10"
          >
            {/* Thumbnail */}
            <div className="w-full h-32 bg-gray-800 rounded mb-2 overflow-hidden relative">
              {ad.video_url ? (
                <video
                  className="w-full h-full object-cover"
                  src={ad.video_url}
                  poster={ad.thumbnail_url}
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={ad.video_url} type="video/mp4" />
                </video>
              ) : ad.thumbnail_url ? (
                <img
                  src={ad.thumbnail_url}
                  alt={ad.ad_creative_link_title || "Ad"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentElement.querySelector('.fallback-gradient');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="fallback-gradient w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <div className="text-white text-xl font-bold">
                    {ad.page_name ? ad.page_name.charAt(0).toUpperCase() : 'A'}
                  </div>
                </div>
              )}
              
              {/* Classification Badge */}
              {ad.classified_category && (
                <div className="absolute top-1 left-1">
                  {getClassificationBadge(ad.classified_category)}
                </div>
              )}
            </div>

            {/* Ad Info */}
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-white line-clamp-1">
                {ad.page_name || "Unknown"}
              </h4>
              {ad.ad_creative_link_title && (
                <p className="text-xs text-white/70 line-clamp-2">
                  {ad.ad_creative_link_title}
                </p>
              )}
              {ad.ad_creative_link_description && (
                <p className="text-xs text-white/60 line-clamp-1">
                  {ad.ad_creative_link_description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-3 px-3 flex items-center justify-between gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || loading}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>
          <span className="text-xs text-white/70">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || loading}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
