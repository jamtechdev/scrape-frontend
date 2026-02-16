import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, login, forgotPassword } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Custom hook for authentication forms
 */
export function useAuthForm() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async ({ email, password }) => {
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await login({ email, password });
      if (response.code === 200) {
        authLogin(response.data.user);
        router.push("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await register({ name, email, password });
      if (response.code === 201) {
        authLogin(response.data.user);
        
        // Check if OAuth setup is needed
        if (response.data.googleOAuthUrl) {
          // Redirect to OAuth flow
          window.location.href = response.data.googleOAuthUrl;
          return;
        }
        
        router.push("/dashboard");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await forgotPassword(email);
      if (response.code === 200) {
        setSuccess(response.message || "OTP sent to your email! Redirecting...");
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 1000);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  return {
    handleLogin,
    handleRegister,
    handleForgotPassword,
    submitting,
    error,
    success,
    resetMessages
  };
}

