"use client";

export default function ScrapingProgress({ progress }) {
  if (!progress) return null;

  const coveragePercentage = Math.min(
    Math.max(progress.coveragePercentage || 0, 0),
    100
  );
  const currentPage = progress.currentPage || 0;
  const totalPages = progress.totalPages || 0;
  const adsScraped = progress.adsScraped || 0;
  const status = progress.status || "running";

  // Calculate progress text
  const progressText =
    totalPages > 0
      ? `Page ${currentPage} of ${totalPages}`
      : `Page ${currentPage}`;

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-green-900 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Scraping in progress...
        </span>
        <span className="text-sm text-green-700 font-bold">
          {coveragePercentage.toFixed(1)}% complete
        </span>
      </div>
      <div className="w-full bg-green-200 rounded-full h-3 mb-3">
        <div
          className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(coveragePercentage, 2)}%` }}
        />
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-green-800 font-medium">
          {progressText} • {adsScraped.toLocaleString()} ads scraped
        </div>
        <div className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded flex items-center gap-1">
          <i className="ri-information-line"></i>
          <span>Please don't refresh this page</span>
        </div>
      </div>
      {status === "running" && (
        <div className="mt-2 text-xs text-green-700">
          <i className="ri-loader-4-line animate-spin mr-1"></i>
          Actively scraping and classifying ads...
        </div>
      )}
    </div>
  );
}


