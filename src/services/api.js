/**
 * Base API client configuration
 * Handles all HTTP requests to the backend API
 */

import { API_BASE_URL } from '@/constants';

// Store logout handler for automatic logout on 401/403
let logoutHandler = null;

/**
 * Set logout handler to be called when user is deleted/unauthorized
 */
export function setLogoutHandler(handler) {
  logoutHandler = handler;
}

/**
 * Get auth token from localStorage
 */
function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

/**
 * Handle automatic logout when user is deleted from DB
 */
function handleUnauthorized() {
  if (typeof window === 'undefined') return;
  
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Call logout handler if set
  if (logoutHandler) {
    logoutHandler();
  }
  
  // Redirect to login page
  if (window.location.pathname.startsWith('/dashboard')) {
    window.location.href = '/';
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token and add to headers if available
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
  
  const defaultOptions = {
    headers,
    credentials: 'include',
    ...options,
  };

  if (options.headers) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      ...options.headers,
    };
  }

  try {
    const response = await fetch(url, defaultOptions);
    
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const skipAutoLogoutEndpoints = ['/auth/me'];
      const shouldSkipAutoLogout = skipAutoLogoutEndpoints.some(skipEndpoint => endpoint.includes(skipEndpoint));
      
      if ((response.status === 401 || response.status === 403) && !shouldSkipAutoLogout) {
        handleUnauthorized();
        throw {
          message: 'Your session has expired or you have been logged out. Please login again.',
          status: response.status,
          details: data.details || null,
          fullError: data,
        };
      }
      
      if (response.status === 401 || response.status === 403) {
        throw {
          message: data.message || 'Authentication required',
          status: response.status,
          details: data.details || null,
          fullError: data,
        };
      }
      
      const error = {
        message: data.message || data.error || 'An error occurred',
        status: response.status,
        details: data.details || null,
        // Preserve Facebook/Meta API error details
        facebookError: data.facebookError || null,
        // Preserve full error response for detailed error extraction
        fullError: data,
      };
      throw error;
    }

    return data;
  } catch (error) {
    // Re-throw API errors
    if (error.status) {
      throw error;
    }
    
    // Network or other errors
    throw {
      message: error.message || 'Network error. Please check your connection.',
      status: 0,
    };
  }
}

/**
 * GET request
 */
export function get(endpoint, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST request
 */
export function post(endpoint, data, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export function put(endpoint, data, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export function del(endpoint, options = {}) {
  return apiRequest(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

export default {
  get,
  post,
  put,
  delete: del,
};

