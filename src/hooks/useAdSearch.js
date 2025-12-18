import { useState, useEffect } from "react";
import { searchAds, getJobStatus, getAdsByCoverage } from "@/services/ads.service";

/**
 * Custom hook for ad search functionality
 */
export function useAdSearch() {
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

  // Fetch ads by coverage ID
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
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [jobId, isScraping]);

  const handleSearch = async (e) => {
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
        setCoverage(response.data.coverage);
        setAds(response.data.ads || []);
        setSuccess(`Found ${response.data.totalAds} ads for "${keyword}"`);
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
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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

