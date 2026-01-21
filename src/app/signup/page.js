"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthForm } from "@/hooks/useAuthForm";
import RegisterForm from "@/components/auth/RegisterForm";
import MessageDisplay from "@/components/auth/MessageDisplay";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const {
    handleRegister,
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
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Don't render signup page if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] py-12 px-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#26996f]/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#26996f]/50 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#000]  transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-[#26996f] mb-2">
              Create Account
            </h1>
          </Link>
          <p className="text-gray-600">
            Start your journey with Adtrova
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 z-[1000]">
          <MessageDisplay error={error} success={success} />

          <RegisterForm
            onSubmit={handleRegister}
            loading={submitting}
          />

          {/* Benefits List */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[#000] text-sm font-medium mb-4">What you'll get:</p>
            <div className="space-y-3">
              {[
                'Unlimited ad searches',
                'Advanced analytics & insights',
                'Export to Google Sheets',
                'Priority support'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#26996f] flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center pt-6 border-t border-white/10">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#26996f] hover:text-green-600 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-2">
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <Link 
              href="/privacy-policy" 
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
