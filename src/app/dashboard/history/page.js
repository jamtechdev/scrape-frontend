"use client";

import { useState } from "react";

export default function History() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Scrape History
        </h1>
        <p className="text-gray-500 mt-1">
          View all your scraping jobs, statuses, and extracted row counts.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Job ID or URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433974] transition"
        />
        <select className="px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#433974]">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="running">Running</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
        <table className="min-w-full text-md">
          <thead>
            <tr className="bg-[#433974] text-white">
              <th className="py-4 px-4 text-left font-semibold">Job ID</th>
              <th className="py-4 px-4 text-left font-semibold">URL</th>
              <th className="py-4 px-4 text-left font-semibold">Status</th>
              <th className="py-4 px-4 text-left font-semibold">Rows</th>
              <th className="py-4 px-4 text-left font-semibold">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition">
              <td className="py-4 px-4 font-medium text-gray-800">
                #2025-112
              </td>
              <td className="py-4 px-4 truncate max-w-[220px] text-[#6052a9]">
                https://example.com/products
              </td>
              <td className="py-4 px-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  Completed
                </span>
              </td>
              <td className="py-4 px-4">118</td>
              <td className="py-4 px-4 text-gray-500">10m ago</td>
            </tr>
            <tr className="bg-gray-50/40 hover:bg-gray-50 transition">
              <td className="py-4 px-4 font-medium text-gray-800">
                #2025-111
              </td>
              <td className="py-4 px-4 truncate max-w-[220px] text-[#6052a9]">
                https://shop.com/search?page=1
              </td>
              <td className="py-4 px-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  Running
                </span>
              </td>
              <td className="py-4 px-4">—</td>
              <td className="py-4 px-4 text-gray-500">20m ago</td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="py-4 px-4 font-medium text-gray-800">
                #2025-110
              </td>
              <td className="py-4 px-4 truncate max-w-[220px] text-[#6052a9]">
                https://blocked.com
              </td>
              <td className="py-4 px-4">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                  Failed
                </span>
              </td>
              <td className="py-4 px-4">0</td>
              <td className="py-4 px-4 text-gray-500">1h ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
