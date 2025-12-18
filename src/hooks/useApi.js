/**
 * Custom hook for API calls with loading and error states
 */

import { useState, useCallback } from 'react';
import { handleApiError } from '@/utils/errorHandler';

export function useApi(apiFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await apiFunction(...args);
        setData(result);
        return { success: true, data: result };
      } catch (err) {
        const errorInfo = handleApiError(err);
        setError(errorInfo.message);
        return { success: false, error: errorInfo };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    loading,
    error,
    data,
    reset,
  };
}

