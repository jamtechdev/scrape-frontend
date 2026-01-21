"use client";
import { useState } from "react";

export default function ForgotPasswordForm({ onSubmit, loading, onBack }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-[#26996f] mb-2">
        Reset Password
      </h2>
      <p className="text-center text-gray-400 mb-8 text-sm">
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
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#26996f] focus:border-[#26996f] transition-all duration-300"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-5 py-3 bg-[#26996f] hover:bg-[#26996f] text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[#26996f] font-semibold hover:text-[#26996f] transition-colors duration-200 underline"
        >
          Back to Sign In
        </button>
      </div>
    </>
  );
}

