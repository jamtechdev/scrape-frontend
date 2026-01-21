"use client";
import { useState, useEffect } from "react";

export default function AdCard({ ad }) {
  const [videoError, setVideoError] = useState(false);
  
  // Reset video error when ad changes
  useEffect(() => {
    setVideoError(false);
  }, [ad.video_url]);
  const getClassificationBadge = (classification) => {
    const config = {
      YES: { bg: "bg-green-100", text: "text-green-700", label: "YES" },
      NO: { bg: "bg-red-100", text: "text-red-700", label: "NO" },
      UNSURE: { bg: "bg-yellow-100", text: "text-yellow-700", label: "UNSURE" }
    };
    const badgeConfig = config[classification] || config.UNSURE;
    return (
      <span className={`${badgeConfig.bg} ${badgeConfig.text} px-2 py-1 rounded text-xs font-medium`}>
        {badgeConfig.label}
      </span>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">
              {ad.page_name || "Unknown Advertiser"}
            </h4>
            {ad.classified_category && getClassificationBadge(ad.classified_category)}
          </div>
          {ad.ad_creative_link_title && (
            <p className="text-sm text-gray-600 mt-1">{ad.ad_creative_link_title}</p>
          )}
        </div>
        {ad.ad_snapshot_url && (
          <a
            href={ad.ad_snapshot_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#26996f] hover:underline ml-2 whitespace-nowrap"
          >
            View Ad →
          </a>
        )}
      </div>
      {ad.ad_creative_body && (
        <p className="text-sm text-gray-700 mt-2">
          {ad.ad_creative_body}
        </p>
      )}
      {ad.ad_creative_link_description && (
        <p className="text-xs text-gray-600 mt-2">
          {ad.ad_creative_link_description}
        </p>
      )}
      {ad.landing_page_url && (
        <p className="text-xs text-gray-500 mt-2 truncate">
          <span className="font-medium">Landing Page:</span>{" "}
          <a 
            href={ad.landing_page_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#26996f] hover:underline"
          >
            {ad.landing_page_url}
          </a>
        </p>
      )}
      {(ad.video_url || ad.thumbnail_url) && (
        <div className="mt-3 relative">
          {/* Priority 1: Show video if video_url exists and hasn't errored */}
          {ad.video_url && !videoError ? (
            <video 
              key={ad.video_url}
              src={ad.video_url} 
              poster={ad.thumbnail_url || undefined}
              controls
              className="w-full h-auto rounded border border-gray-200 max-h-96 object-contain bg-black"
              preload="metadata"
              playsInline
              muted={false}
              onError={() => {
                console.log('Video failed to load, falling back to thumbnail:', ad.video_url);
                setVideoError(true);
              }}
            >
              Your browser does not support the video tag.
            </video>
          ) : null}
          
          {/* Priority 2: Show thumbnail if no video_url OR video failed to load */}
          {(!ad.video_url || videoError) && ad.thumbnail_url ? (
            <img 
              src={ad.thumbnail_url} 
              alt="Ad thumbnail" 
              className="w-full h-auto rounded border border-gray-200 max-h-96 object-contain"
              onError={(e) => { 
                e.target.style.display = 'none'; 
              }}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

