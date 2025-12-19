"use client";

export default function ScrapingProgress({ progress }) {
  if (!progress) return null;

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-900">
          Preparing results, this may take a few minutes...
        </span>
        <span className="text-sm text-blue-700 font-semibold">
          {progress.coveragePercentage}% complete
        </span>
      </div>
      <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.max(progress.coveragePercentage, 5)}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-blue-700">
          Page {progress.currentPage} • {progress.adsScraped} ads scraped
        </div>
        <div className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded">
          <i className="ri-information-line mr-1"></i>
          Please don't refresh this page
        </div>
      </div>
    </div>
  );
}

