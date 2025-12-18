/**
 * Centralized error handling utilities
 */

/**
 * Extract error message from error object
 */
export function getErrorMessage(error) {
  if (!error) return 'An error occurred. Please try again.';
  
  if (typeof error === 'string') return error;
  
  if (error.message) return error.message;
  
  if (error.error) return error.error;
  
  return 'An error occurred. Please try again.';
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error) {
  const message = getErrorMessage(error);
  const status = error?.status || 0;
  
  // Handle specific status codes
  if (status === 401) {
    return {
      message: 'Your session has expired. Please log in again.',
      shouldRedirect: true,
      redirectTo: '/',
    };
  }
  
  if (status === 403) {
    return {
      message: 'You do not have permission to perform this action.',
      shouldRedirect: false,
    };
  }
  
  if (status === 404) {
    return {
      message: 'The requested resource was not found.',
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

