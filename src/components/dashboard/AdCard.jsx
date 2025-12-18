"use client";

export default function AdCard({ ad }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">
            {ad.page_name || "Unknown Advertiser"}
          </h4>
          {ad.ad_creative_link_title && (
            <p className="text-sm text-gray-600 mt-1">{ad.ad_creative_link_title}</p>
          )}
        </div>
        {ad.ad_snapshot_url && (
          <a
            href={ad.ad_snapshot_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#433974] hover:underline"
          >
            View Ad →
          </a>
        )}
      </div>
      {ad.ad_creative_body && (
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {ad.ad_creative_body}
        </p>
      )}
      {ad.landing_page_url && (
        <p className="text-xs text-gray-500 mt-2">
          Landing Page: <span className="text-[#433974]">{ad.landing_page_url}</span>
        </p>
      )}
    </div>
  );
}

