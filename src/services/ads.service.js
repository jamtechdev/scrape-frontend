/**
 * Ads Service
 * Handles all ads-related API calls
 */

import { post, get } from './api';

/**
 * Search ads by keyword
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.keyword - Search keyword
 * @param {string} searchParams.country - Country code (e.g., 'DE', 'US')
 * @param {string} searchParams.dateStart - Start date (ISO 8601)
 * @param {string} searchParams.dateEnd - End date (ISO 8601)
 * @returns {Promise<Object>} Search response with coverage and ads
 */
export async function searchAds(searchParams) {
  const response = await post('/ads/search', {
    keyword: searchParams.keyword,
    country: searchParams.country,
    dateStart: searchParams.dateStart,
    dateEnd: searchParams.dateEnd,
  });
  return response;
}

/**
 * Check coverage status
 * @param {Object} params - Coverage check parameters
 * @param {string} params.keyword - Search keyword
 * @param {string} params.country - Country code
 * @param {string} params.dateStart - Start date (ISO 8601)
 * @param {string} params.dateEnd - End date (ISO 8601)
 * @returns {Promise<Object>} Coverage status
 */
export async function checkCoverage(params) {
  const response = await post('/ads/coverage/check', {
    keyword: params.keyword,
    country: params.country,
    dateStart: params.dateStart,
    dateEnd: params.dateEnd,
  });
  return response;
}

/**
 * Get job status
 * @param {string} jobId - Job ID
 * @returns {Promise<Object>} Job status
 */
export async function getJobStatus(jobId) {
  const response = await get(`/ads/job/${jobId}`);
  return response;
}

/**
 * Get ads by coverage ID
 * @param {string} coverageId - Coverage ID
 * @param {Object} options - Pagination options
 * @param {number} options.limit - Number of ads per page
 * @param {number} options.offset - Offset for pagination
 * @returns {Promise<Object>} Ads and pagination info
 */
export async function getAdsByCoverage(coverageId, options = {}) {
  const params = new URLSearchParams();
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);
  
  const queryString = params.toString();
  const url = `/ads/coverage/${coverageId}${queryString ? `?${queryString}` : ''}`;
  
  const response = await get(url);
  return response;
}

export default {
  searchAds,
  checkCoverage,
  getJobStatus,
  getAdsByCoverage,
};

