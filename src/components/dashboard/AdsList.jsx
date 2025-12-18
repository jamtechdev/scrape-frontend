"use client";
import AdCard from "./AdCard";

export default function AdsList({ ads }) {
  if (ads.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Results ({ads.length} ads)
      </h3>
      <div className="space-y-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}

