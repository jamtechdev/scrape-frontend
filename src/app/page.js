"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register, login, forgotPassword } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { login: authLogin, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (activeTab === "login") {
        const response = await login({ email, password });
        console.log('Login response:', response);
        if (response.code === 200) {
          authLogin(response.data.user);
          router.push("/dashboard");
        } else {
          setError(response.message || "Login failed");
        }
      } else if (activeTab === "register") {
        const response = await register({ name, email, password });
        console.log('Register response:', response);
        if (response.code === 201) {
          authLogin(response.data.user);
          router.push("/dashboard");
        } else {
          setError(response.message || "Registration failed");
        }
      } else if (activeTab === "forgot") {
        const response = await forgotPassword(email);
        if (response.code === 200) {
          setSuccess(response.message || "OTP sent to your email! Redirecting...");
          setTimeout(() => {
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
          }, 1500);
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex-1 md:w-1/2 hidden md:block bg-[url('/auth-bg.jpg')] bg-no-repeat bg-cover bg-center h-[100vh]">
      </div>
      <div className="flex-1 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="flex mb-8 p-2 rounded-full bg-[#f1eeff]">
            <button
              type="button"
              onClick={() => handleTabChange("login")}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "login" || activeTab === "forgot"
                  ? "bg-[#433974] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("register")}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "register"
                  ? "bg-[#433974] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {activeTab === "login" && (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Welcome Back
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => handleTabChange("forgot")}
                  className="text-sm text-[#433974] font-semibold hover:text-[#5145a3] transition-colors duration-200 underline"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          )}

          {activeTab === "register" && (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Create Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </>
          )}

          {activeTab === "forgot" && (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Reset Password
              </h2>
              <p className="text-center text-gray-600 mb-8 text-sm">
                Enter your email and we'll send you a reset link
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => handleTabChange("login")}
                  className="text-sm text-[#433974] font-semibold hover:text-[#5145a3] transition-colors duration-200 underline"
                >
                  Back to Sign In
                </button>
              </div>
            </>
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
