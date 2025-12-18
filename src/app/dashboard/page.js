"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { searchAds, getJobStatus, getAdsByCoverage } from "@/services/ads.service";
import { countries } from "@/data/countries";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Form state
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("DE");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  
  // Search state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Results state
  const [coverage, setCoverage] = useState(null);
  const [ads, setAds] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(null);

  // Set default date range (last 30 days)
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    setDateEnd(today.toISOString().split('T')[0]);
    setDateStart(thirtyDaysAgo.toISOString().split('T')[0]);
  }, []);

  // Poll job status if scraping is in progress
  useEffect(() => {
    if (!jobId || !isScraping) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await getJobStatus(jobId);
        
        if (response.code === 200 && response.data) {
          const job = response.data.job;
          const coverageData = response.data.coverage;
          
          setScrapingProgress({
            status: job.status,
            currentPage: job.currentPage || 0,
            adsScraped: job.adsScraped || 0,
            coveragePercentage: coverageData?.coveragePercentage || 0
          });

          // If job is completed, fetch ads
          if (job.status === 'completed' && coverageData?.isComplete) {
            setIsScraping(false);
            await fetchAds(coverageData.id);
          } else if (job.status === 'failed') {
            setIsScraping(false);
            setError(job.errorMessage || 'Scraping failed');
          }
        }
      } catch (err) {
        console.error('Error polling job status:', err);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [jobId, isScraping]);

  const fetchAds = async (coverageId) => {
    try {
      const response = await getAdsByCoverage(coverageId, { limit: 100, offset: 0 });
      if (response.code === 200 && response.data) {
        setAds(response.data.ads || []);
        setCoverage(response.data.coverage);
      }
    } catch (err) {
      console.error('Error fetching ads:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setAds([]);
    setCoverage(null);
    setIsScraping(false);
    setJobId(null);

    try {
      const response = await searchAds({
        keyword,
        country,
        dateStart,
        dateEnd,
      });

      if (response.code === 200) {
        // Coverage is complete, show results immediately
        setCoverage(response.data.coverage);
        setAds(response.data.ads || []);
        setSuccess(`Found ${response.data.totalAds} ads for "${keyword}"`);
      } else if (response.code === 202) {
        // Scraping in progress
        setCoverage(response.data.coverage);
        setJobId(response.data.job.id);
        setIsScraping(true);
        setScrapingProgress({
          status: response.data.job.status,
          currentPage: response.data.job.currentPage || 0,
          adsScraped: response.data.job.adsScraped || 0,
          coveragePercentage: response.data.coverage.coveragePercentage || 0
        });
        setSuccess(response.message || "Preparing results, this may take a few minutes.");
      } else {
        setError(response.message || "Search failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Search Ads</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., 50% Rabatt, Winterjacke"
              required
              error={error && !keyword ? "Keyword is required" : ""}
            />

            <Select
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              options={countryOptions}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              required
            />

            <Input
              label="End Date"
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading || isScraping}
            className="w-full md:w-auto"
          >
            {isScraping ? "Scraping in Progress..." : "Search Ads"}
          </Button>
        </form>

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
        {isScraping && scrapingProgress && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Preparing results, this may take a few minutes...
              </span>
              <span className="text-sm text-blue-700">
                {scrapingProgress.coveragePercentage}% complete
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${scrapingProgress.coveragePercentage}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-blue-700">
              Page {scrapingProgress.currentPage} • {scrapingProgress.adsScraped} ads scraped
            </div>
          </div>
        )}
      </div>

      {/* Coverage Info */}
      {coverage && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Coverage Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Keyword</p>
              <p className="font-semibold text-gray-900">{coverage.keyword}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-semibold text-gray-900">{coverage.country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Coverage</p>
              <p className="font-semibold text-gray-900">
                {coverage.isComplete ? (
                  <span className="text-green-600">100% Complete</span>
                ) : (
                  <span className="text-yellow-600">{coverage.coveragePercentage}%</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Ads</p>
              <p className="font-semibold text-gray-900">{coverage.totalAds || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {ads.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Results ({ads.length} ads)
          </h3>
          <div className="space-y-4">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
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
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !isScraping && ads.length === 0 && coverage && coverage.isComplete && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-500">No ads found for this keyword and date range.</p>
        </div>
      )}
    </div>
  );
}
