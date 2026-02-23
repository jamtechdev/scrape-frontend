/**
 * Centralized error handling utilities
 */

/**
 * Extract error message from error object
 * Prioritizes Meta/Facebook API error messages
 */
export function getErrorMessage(error) {
  if (!error) return 'An error occurred. Please try again.';
  
  if (typeof error === 'string') return error;
  
  // Priority 1: Meta/Facebook API error message (most specific)
  if (error.facebookError) {
    const fbError = error.facebookError;
    // Try to get the most detailed message
    if (fbError.message) return fbError.message;
    if (fbError.fullError?.message) return fbError.fullError.message;
    if (fbError.fullError?.error?.message) return fbError.fullError.error.message;
    if (fbError.fullError?.error?.error_user_msg) return fbError.fullError.error.error_user_msg;
    if (fbError.fullError?.error?.error_user_title) return fbError.fullError.error.error_user_title;
  }

  // Priority 2: Direct error message
  if (error.message) return error.message;
  
  // Priority 3: Error field
  if (error.error) {
    if (typeof error.error === 'string') return error.error;
    if (error.error.message) return error.error.message;
  }

  // Priority 4: Details field
  if (error.details) {
    if (typeof error.details === 'string') return error.details;
    if (error.details.message) return error.details.message;
  }

  // Priority 5: Full error object (if it's a string)
  if (error.fullError) {
    if (typeof error.fullError === 'string') return error.fullError;
    if (error.fullError.message) return error.fullError.message;
    if (error.fullError.error?.message) return error.fullError.error.message;
  }
  
  return 'An error occurred. Please try again.';
}

/**
 * Handle API errors consistently
 * Shows actual Meta API error messages when available
 */
export function handleApiError(error) {
  const message = getErrorMessage(error);
  const status = error?.status || 0;
  
  // For Meta/Facebook API errors, show the actual error message
  // Don't override with generic messages for these cases
  if (error?.facebookError) {
    return {
      message: message, // This will be the Meta API error message
      shouldRedirect: false,
      facebookError: error.facebookError, // Preserve for debugging if needed
    };
  }

  // Handle specific status codes (only if not a Meta API error)
  // NOTE: For pause/resume endpoints, 401/403 should NOT trigger logout
  // These are handled in api.js with skipAutoLogoutEndpoints
  if (status === 401) {
    return {
      message: 'Your session has expired. Please log in again.',
      shouldRedirect: false, // Don't auto-redirect - let user decide
    };
  }
  
  if (status === 403) {
    return {
      message: message || 'You do not have permission to perform this action.',
      shouldRedirect: false,
    };
  }
  
  if (status === 404) {
    return {
      message: message || 'The requested resource was not found.',
      shouldRedirect: false,
    };
  }
  
  if (status === 0) {
    return {
      message: 'Network error. Please check your connection.',
      shouldRedirect: false,
    };
  }
  
  return {
    message,
    shouldRedirect: false,
  };
}

