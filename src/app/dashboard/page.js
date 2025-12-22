"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { countries } from "@/data/countries";
import { useAdSearch } from "@/hooks/useAdSearch";
import SearchForm from "@/components/dashboard/SearchForm";
import ScrapingProgress from "@/components/dashboard/ScrapingProgress";
import CoverageInfo from "@/components/dashboard/CoverageInfo";
import AdsList from "@/components/dashboard/AdsList";
import RecentJobs from "@/components/dashboard/RecentJobs";
import Alert from "@/components/ui/Alert";

export default function Dashboard() {
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
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome, <span className="text-[#433974]">{user?.name || 'User'}</span>!
        </h2>
        <p className="text-gray-500 mt-1">
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

      {/* Results */}
      <AdsList ads={ads} />

      {/* Empty State */}
      {!loading && !isScraping && ads.length === 0 && coverage && coverage.isComplete && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-500">No ads found for this keyword and date range.</p>
        </div>
      )}

      {/* Recent Completed Jobs - Always show when not scraping */}
      {!isScraping && <RecentJobs />}
    </div>
  );
}
