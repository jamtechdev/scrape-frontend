"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { countries } from "@/data/countries";
import { useAdSearch } from "@/hooks/useAdSearch";
import SearchForm from "@/components/dashboard/SearchForm";
import ScrapingProgress from "@/components/dashboard/ScrapingProgress";
import CoverageInfo from "@/components/dashboard/CoverageInfo";
import RecentJobs from "@/components/dashboard/RecentJobs";
import Alert from "@/components/ui/Alert";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const {
        keyword,
        country,
        dateStart,
        dateEnd,
    setKeyword,
    setCountry,
    setDateStart,
    setDateEnd,
    loading,
    error,
    success,
    coverage,
    ads,
    isScraping,
    scrapingProgress,
    handleSearch
  } = useAdSearch();

  // Handle OAuth success/error messages and auto-search after OAuth
  useEffect(() => {
    const oauthStatus = searchParams?.get("oauth");
    const searchStarted = searchParams?.get("search");
    
    if (oauthStatus === "success") {
      // Show success message (will be handled by Alert component if needed)
      // Clear URL parameter
      router.replace("/dashboard", { scroll: false });
    } else if (oauthStatus === "error") {
      // Error already handled, just clear URL
      router.replace("/dashboard", { scroll: false });
    }
    
    // If search was started from OAuth callback, the search is already running
    // The polling mechanism in useAdSearch will automatically pick it up
    if (searchStarted === "started") {
      router.replace("/dashboard", { scroll: false });
    }
  }, [searchParams, router]);

  // Warn user before refreshing when scraping is in progress
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isScraping) {
        e.preventDefault();
        // Modern browsers ignore custom message, but we still need to set returnValue
        e.returnValue = "Scraping is in progress. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isScraping]);

  // Format country options
  const countryOptions = countries
    .filter(c => c.code !== "ALL")
    .map(c => ({ value: c.code, label: c.name }));

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome, <span className="text-[#26996f]">{user?.name || 'User'}</span>!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Search Facebook ads by keyword with intelligent coverage tracking.
        </p>
      </div>

      {/* Search Form */}
      <SearchForm
        keyword={keyword}
        country={country}
        dateStart={dateStart}
        dateEnd={dateEnd}
        countryOptions={countryOptions}
        loading={loading}
        isScraping={isScraping}
        onKeywordChange={(e) => setKeyword(e.target.value)}
        onCountryChange={(e) => setCountry(e.target.value)}
        onDateStartChange={(e) => setDateStart(e.target.value)}
        onDateEndChange={(e) => setDateEnd(e.target.value)}
        onSubmit={handleSearch}
      />

        {/* Status Messages */}
        {error && (
          <div className="mt-4">
            <Alert variant="error" message={error} />
          </div>
        )}

        {success && (
          <div className="mt-4">
            <Alert variant="success" message={success} />
          </div>
        )}

        {/* Scraping Progress */}
      {isScraping && <ScrapingProgress progress={scrapingProgress} />}

      {/* Coverage Info */}
      <CoverageInfo coverage={coverage} />

      {/* Info Message - Ads are only in Google Sheets */}
      {coverage && coverage.isComplete && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
            📊 Ads Analysis Available in Google Sheets
          </h3>
          <p className="text-sm sm:text-base text-blue-700">
            All analyzed ads have been exported to your Google Sheet. Each search creates a new tab in your sheet with the following information:
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base text-blue-700 mt-2 space-y-1">
            <li>Clothing classification (sure/unsure)</li>
            <li>Facebook Ad Link</li>
            <li>Product Link</li>
            <li>Date Started Running</li>
            <li>Number of Days Live</li>
            <li>Total Reach When Found</li>
            <li>Estimated Daily Reach</li>
          </ul>
          <p className="text-sm sm:text-base text-blue-700 mt-3">
            Visit the <strong>Sheets</strong> page to view and access your Google Sheets.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !isScraping && coverage && coverage.isComplete && coverage.totalAds === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-500">No ads found for this keyword and date range.</p>
        </div>
      )}

      {/* Recent Completed Jobs - Always show when not scraping */}
      {!isScraping && <RecentJobs />}
    </div>
  );
}
