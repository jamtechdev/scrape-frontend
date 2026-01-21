import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchAds, getJobStatus, getAdsByCoverage, checkOAuthStatus } from "@/services/ads.service";
import { get } from "@/services/api";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

/**
 * Custom hook for ad search functionality
 */
export function useAdSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("DE");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [coverage, setCoverage] = useState(null);
  const [ads, setAds] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(null);

  // Fetch ALL ads by coverage ID (with pagination to get everything)
  const fetchAds = async (coverageId) => {
    try {
      const allAds = [];
      let offset = 0;
      const limit = 100;
      let hasMore = true;

      // Fetch all ads in batches
      while (hasMore) {
        const response = await getAdsByCoverage(coverageId, { limit, offset });
        
        if (response.code === 200 && response.data) {
          const fetchedAds = response.data.ads || [];
          allAds.push(...fetchedAds);
          
          // Update coverage info from first response
          if (offset === 0) {
            setCoverage(response.data.coverage);
          }
          
          // Check if there are more ads to fetch
          const totalAds = response.data.coverage?.totalAds || 0;
          if (allAds.length >= totalAds || fetchedAds.length < limit) {
            hasMore = false;
          } else {
            offset += limit;
          }
        } else {
          hasMore = false;
        }
      }

      setAds(allAds);
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message || 'Failed to load ads. Please try again.');
    }
  };

  // Set default date range (last 30 days)
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    setDateEnd(today.toISOString().split('T')[0]);
    setDateStart(thirtyDaysAgo.toISOString().split('T')[0]);
  }, []);

  // Check for pending search after OAuth verification
  useEffect(() => {
    const pendingJobId = localStorage.getItem("pendingSearchJobId");
    const pendingCoverageId = localStorage.getItem("pendingSearchCoverageId");
    
    if (pendingJobId) {
      // Clear the pending job ID
      localStorage.removeItem("pendingSearchJobId");
      // Set up polling for this job
      setJobId(pendingJobId);
      setIsScraping(true);
      setSuccess("Search started! Fetching results...");
    } else if (pendingCoverageId) {
      // Clear the pending coverage ID
      localStorage.removeItem("pendingSearchCoverageId");
      // Fetch ads for this coverage
      fetchAds(pendingCoverageId);
      setSuccess("Search completed! Loading results...");
    }
  }, []);

  // Poll job status if scraping is in progress (real-time updates)
  useEffect(() => {
    if (!jobId || !isScraping) return;

    // Poll immediately when scraping starts
    const pollJobStatus = async () => {
      try {
        const response = await getJobStatus(jobId);
        
        if (response.code === 200 && response.data) {
          const job = response.data.job;
          const coverageData = response.data.coverage;
          
          // Update progress with latest data
          setScrapingProgress({
            status: job.status,
            currentPage: job.currentPage || 0,
            totalPages: job.totalPages || 0,
            adsScraped: job.adsScraped || 0,
            coveragePercentage: coverageData?.coveragePercentage || 0
          });

          // Update coverage data dynamically
          if (coverageData) {
            setCoverage({
              id: coverageData.id,
              keyword: coverageData.keyword,
              country: coverageData.country,
              dateStart: coverageData.dateStart,
              dateEnd: coverageData.dateEnd,
              isComplete: coverageData.isComplete,
              coveragePercentage: coverageData.coveragePercentage || 0,
              totalAds: coverageData.totalAds || 0
            });
          }

          if (job.status === 'completed' && coverageData?.isComplete) {
            setIsScraping(false);
            setSuccess("Scraping completed successfully!");
            await fetchAds(coverageData.id);
          } else if (job.status === 'failed') {
            setIsScraping(false);
            setError(job.errorMessage || 'Scraping failed');
          }
        }
      } catch (err) {
        // Silently handle polling errors - don't interrupt user experience
        const errorInfo = handleApiError(err);
      }
    };

    pollJobStatus();
    const pollInterval = setInterval(pollJobStatus, 5000);

    return () => clearInterval(pollInterval);
  }, [jobId, isScraping]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // TEMPORARY: Override for design purposes - just redirect to dashboard
    // TODO: Remove this override and restore original search functionality
    setSuccess("Design mode: Redirecting to dashboard...");

    // Redirect to dashboard (already on dashboard, but this ensures page refresh)
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }

    return;

    // Original code (commented out for design mode):
    /*
    setError("");
    setSuccess("");
    setLoading(true);
    setAds([]);
    setCoverage(null);
    setIsScraping(false);
    setJobId(null);

    try {
      // Check OAuth status before searching
      const oauthStatus = await checkOAuthStatus();
      const isOAuthConnected = oauthStatus?.code === 200 && oauthStatus?.data?.hasToken;

      if (!isOAuthConnected) {
        // Store search parameters for after OAuth verification
        const searchParams = {
          keyword,
          country,
          dateStart,
          dateEnd,
        };
        localStorage.setItem('pendingSearchParams', JSON.stringify(searchParams));
        
        // Get OAuth URL and redirect
        const frontendUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
        const redirectUri = `${frontendUrl}/google-oauth-callback?from=search`;
        
        const oauthUrlResponse = await get(`/ads/google-sheets/oauth-url?redirect_uri=${encodeURIComponent(redirectUri)}`);
        
        if (oauthUrlResponse?.code === 200 && oauthUrlResponse?.data?.authUrl) {
          setLoading(false);
          setSuccess("Please connect your Google account to continue. Redirecting to verification...");
          // Redirect to OAuth
          window.location.href = oauthUrlResponse.data.authUrl;
          return;
        } else {
          throw new Error("Failed to get OAuth URL. Please connect Google account from Settings first.");
        }
      }

      // OAuth is connected, proceed with search
      const response = await searchAds({
        keyword,
        country,
        dateStart,
        dateEnd,
      });

      if (response.code === 200) {
        // Coverage is complete - fetch ALL ads
        setCoverage(response.data.coverage);
        if (response.data.coverage?.id) {
          // Fetch all ads for this coverage
          await fetchAds(response.data.coverage.id);
        } else {
          // Fallback to ads from response if coverage ID not available
          setAds(response.data.ads || []);
        }
        setSuccess(`Found ${response.data.totalAds || response.data.ads?.length || 0} ads for "${keyword}"`);
      } else if (response.code === 202) {
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
      console.error('❌ Search error:', err);
      
      // Extract error message from API response
      let errorMessage = "An error occurred. Please try again.";
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.fullError?.message) {
        errorMessage = err.fullError.message;
      } else if (err.fullError?.error) {
        errorMessage = err.fullError.error;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      // Use handleApiError for better error extraction
      try {
        const errorInfo = handleApiError(err);
        errorMessage = errorInfo.message || errorMessage;
      } catch (handleError) {
        // If handleApiError fails, use the extracted message above
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    */
  };

  return {
    // Form state
    keyword,
    country,
    dateStart,
    dateEnd,
    setKeyword,
    setCountry,
    setDateStart,
    setDateEnd,
    
    // Search state
    loading,
    error,
    success,
    
    // Results
    coverage,
    ads,
    isScraping,
    scrapingProgress,
    
    // Actions
    handleSearch
  };
}

