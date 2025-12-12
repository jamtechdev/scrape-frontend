"use client";

import { useState } from "react";

export default function Sheets() {
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Generated Google Sheets
        </h1>
        <p className="text-gray-500 mt-1">
          View all exported scraping results saved as Google Sheets.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Sheet name or Job ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] transition"
        />

        <select className="px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#433974]">
          <option value="">All Sheets</option>
          <option value="recent">Recently Created</option>
          <option value="older">Older Sheets</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
        <table className="min-w-full text-md">
          <thead>
            <tr className="bg-[#433974] text-white">
              <th className="py-4 px-4 text-left font-semibold">Sheet Name</th>
              <th className="py-4 px-4 text-left font-semibold">Job ID</th>
              <th className="py-4 px-4 text-left font-semibold">Rows</th>
              <th className="py-4 px-4 text-left font-semibold">Created</th>
              <th className="py-4 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            {/* Row Example */}
            <tr className="hover:bg-gray-50 transition">
              <td className="py-4 px-4 text-[#6052a9] font-medium truncate max-w-[220px]">
                Scrape_Products_2025
              </td>
              <td className="py-4 px-4 text-gray-800">#2025-112</td>
              <td className="py-4 px-4">118</td>
              <td className="py-4 px-4 text-gray-500">10m ago</td>
              <td className="py-4 px-4">
                <a
                  href="https://docs.google.com/sheet/d/EXAMPLE"
                  target="_blank"
                  className="px-3 py-1 bg-[#433974] text-white rounded-lg text-sm font-medium hover:bg-[#5145a3] transition"
                >
                  Open Sheet
                </a>
              </td>
            </tr>

            <tr className="bg-gray-50/40 hover:bg-gray-50 transition">
              <td className="py-4 px-4 text-[#6052a9] font-medium truncate max-w-[220px]">
                Shop_Page_Results
              </td>
              <td className="py-4 px-4 text-gray-800">#2025-111</td>
              <td className="py-4 px-4">54</td>
              <td className="py-4 px-4 text-gray-500">25m ago</td>
              <td className="py-4 px-4">
                <a
                  href="https://docs.google.com/sheet/d/EXAMPLE"
                  target="_blank"
                  className="px-3 py-1 bg-[#433974] text-white rounded-lg text-sm font-medium hover:bg-[#5145a3] transition"
                >
                  Open Sheet
                </a>
              </td>
            </tr>

            <tr className="hover:bg-gray-50 transition">
              <td className="py-4 px-4 text-[#6052a9] font-medium truncate max-w-[220px]">
                Blocked_URL_Error
              </td>
              <td className="py-4 px-4 text-gray-800">#2025-110</td>
              <td className="py-4 px-4">0</td>
              <td className="py-4 px-4 text-gray-500">1h ago</td>
              <td className="py-4 px-4">
                <button
                  disabled
                  className="px-3 py-1 bg-gray-300 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed"
                >
                  No Sheet
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}
