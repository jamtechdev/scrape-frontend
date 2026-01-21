"use client";
import { useState } from "react";
import AdCard from "./AdCard";

export default function AdsList({ ads }) {
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 20;
  const displayedAds = showAll ? ads : ads.slice(0, itemsPerPage);
  const hasMore = ads.length > itemsPerPage;

  if (ads.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Results ({ads.length} {ads.length === 1 ? 'ad' : 'ads'})
        </h3>
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-[#26996f] hover:underline font-medium"
          >
            Show All ({ads.length})
          </button>
        )}
        {hasMore && showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="text-sm text-[#26996f] hover:underline font-medium"
          >
            Show Less
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
      
      {hasMore && !showAll && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing {itemsPerPage} of {ads.length} ads
          </p>
        </div>
      )}
    </div>
  );
}

