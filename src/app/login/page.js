"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthForm } from "@/hooks/useAuthForm";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import MessageDisplay from "@/components/auth/MessageDisplay";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const {
    handleLogin,
    handleForgotPassword,
    submitting,
    error,
    success,
    resetMessages
  } = useAuthForm();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-900">Loading...</div>
      </div>
    );
  }

  // Don't render login page if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#26996f]/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#26996f]/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#26996f]/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#000] hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#26996f] to-green-700">
              Welcome Back
            </h1>
          </Link>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <MessageDisplay error={error} success={success} />

          {!showForgotPassword ? (
            <LoginForm
              onSubmit={handleLogin}
              loading={submitting}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          ) : (
            <ForgotPasswordForm
              onSubmit={handleForgotPassword}
              loading={submitting}
                onBack={() => {
                  setShowForgotPassword(false);
                  resetMessages();
                }}
            />
          )}

          <div className="mt-8 text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#26996f] hover:text-green-600 transition-colors duration-200"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-2">
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-gray-900 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
