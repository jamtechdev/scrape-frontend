"use client";

import { useState } from "react";

export default function Setting() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");
  const [delay, setDelay] = useState("1500");
  const [userAgent, setUserAgent] = useState("Mozilla/5.0 Chrome/120");
  const [format, setFormat] = useState("google-sheet");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="pb-20">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences and scraper configuration.
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-6">
          <label className="block text-gray-600 mb-1 font-medium">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
          />
        </div>

        {/* Save Button */}
        <button className="mt-6 px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition">
          Save Changes
        </button>
      </div>

      {/* Scraper Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Scraper Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Delay */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Default Delay (ms)
            </label>
            <input
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#433974] outline-none"
            />
          </div>

          {/* User Agent */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              User-Agent
            </label>
            <input
              type="text"
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#433974] outline-none"
            />
          </div>

          {/* Result Format */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Default Result Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#433974] outline-none"
            >
              <option value="google-sheet">Google Sheet</option>
              <option value="csv">CSV Download</option>
              <option value="json">JSON Response</option>
            </select>
          </div>

          {/* Notifications */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email Notifications
            </label>
            <select
              value={notifications}
              onChange={(e) => setNotifications(e.target.value === "true")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-[#433974] outline-none"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button className="mt-6 px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition">
          Save Scraper Settings
        </button>
      </div>
    </div>
  );
}
