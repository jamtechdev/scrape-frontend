/**
 * Custom hook for form state management
 */

import { useState, useCallback } from 'react';

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const setError = useCallback((name, message) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const resetField = useCallback((name) => {
    setValues((prev) => ({ ...prev, [name]: initialValues[name] || '' }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    setTouched((prev) => {
      const newTouched = { ...prev };
      delete newTouched[name];
      return newTouched;
    });
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setError,
    setFieldValue,
    reset,
    resetField,
  };
}

