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
          disabled={loading}
          className="w-full px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[#433974] font-semibold hover:text-[#5145a3] transition-colors duration-200 underline"
        >
          Back to Sign In
        </button>
      </div>
    </>
  );
}

