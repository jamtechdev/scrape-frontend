"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthForm } from "@/hooks/useAuthForm";
import TabSwitcher from "@/components/auth/TabSwitcher";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import MessageDisplay from "@/components/auth/MessageDisplay";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const {
    handleLogin,
    handleRegister,
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetMessages();
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Don't render login page if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex-1 md:w-1/2 hidden md:block bg-[url('/auth-bg.jpg')] bg-no-repeat bg-cover bg-center h-[100vh]">
      </div>
      <div className="flex-1 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />
          
          <MessageDisplay error={error} success={success} />

          {activeTab === "login" && (
            <LoginForm
              onSubmit={handleLogin}
              loading={submitting}
              onForgotPassword={() => handleTabChange("forgot")}
            />
          )}

          {activeTab === "register" && (
            <RegisterForm
              onSubmit={handleRegister}
              loading={submitting}
            />
          )}

          {activeTab === "forgot" && (
            <ForgotPasswordForm
              onSubmit={handleForgotPassword}
              loading={submitting}
              onBack={() => handleTabChange("login")}
            />
          )}

          {activeTab === "login" && (
            <div className="mt-8 text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabChange("register")}
                  className="font-semibold text-[#433974] hover:text-[#5145a3] transition-colors duration-200"
                >
                  Sign up
                </button>
              </p>
            </div>
          )}

          {activeTab === "register" && (
            <div className="mt-8 text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabChange("login")}
                  className="font-semibold text-[#433974] hover:text-[#5145a3] transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
