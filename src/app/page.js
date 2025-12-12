"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password, name };
    console.log(
      `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}:`,
      data
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex-1 md:w-1/2 hidden md:block bg-[url('/auth-bg.jpg')] bg-no-repeat bg-cover bg-center h-[100vh]">
      </div>
      <div className="flex-1 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="flex mb-8 p-2 rounded-full bg-[#f1eeff]">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "login" || activeTab === "forgot"
                  ? "bg-[#433974] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === "register"
                  ? "bg-[#433974] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

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
                  className="w-full px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setActiveTab("forgot")}
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
                  className="w-full px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition"
                >
                  Create Account
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
                  className="w-full px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          )}

          {activeTab === "login" && (
            <div className="mt-8 text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Don't have an account?
                <button
                  onClick={() => setActiveTab("register")}
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
                Already have an account?
                <button
                  onClick={() => setActiveTab("login")}
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
