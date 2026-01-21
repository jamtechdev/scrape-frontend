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
    <div className="mt-6 bg-gradient-to-br from-[#26996f] to-[#26996f] rounded-xl shadow-lg border border-purple-300 overflow-hidden">
      {/* Animated Header */}
      <div className="p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Animated Spinner */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="ri-search-line text-white text-base sm:text-lg"></i>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="hidden sm:inline">Scraping in Progress</span>
                <span className="sm:hidden">Scraping...</span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">Actively scraping and classifying ads...</p>
            </div>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {coveragePercentage.toFixed(1)}%
            </div>
            <div className="text-xs text-white/70">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur-sm">
            <div
              className="bg-gradient-to-r from-green-400 via-green-300 to-green-400 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${Math.max(coveragePercentage, 3)}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          {/* Progress percentage indicator on bar */}
          {coveragePercentage > 10 && (
            <div 
              className="absolute top-0 h-4 flex items-center text-xs font-bold text-white drop-shadow-md"
              style={{ left: `calc(${coveragePercentage}% - 20px)` }}
            >
              {coveragePercentage.toFixed(0)}%
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="text-xs text-white/70 mb-1">Current Page</div>
            <div className="text-lg font-bold text-white">{currentPage}</div>
            {totalPages > 0 && (
              <div className="text-xs text-white/60">of {totalPages}</div>
            )}
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="text-xs text-white/70 mb-1">Ads Scraped</div>
            <div className="text-lg font-bold text-white">{adsScraped.toLocaleString()}</div>
            <div className="text-xs text-white/60">and counting...</div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-3 flex items-start gap-2 backdrop-blur-sm">
          <i className="ri-information-line text-amber-300 text-lg mt-0.5"></i>
          <div className="flex-1">
            <div className="text-sm font-semibold text-amber-100">Please don't refresh this page</div>
            <div className="text-xs text-amber-200/80 mt-0.5">Scraping will continue in the background</div>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-purple-400 to-green-400 animate-gradient-x"></div>
    </div>
  );
}


