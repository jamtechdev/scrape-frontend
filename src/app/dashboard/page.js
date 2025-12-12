export default function Dashboard() {
  return (
    <div className="space-y-12">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Good morning, <span className="text-[#433974] font-bold">John Doe</span></h2>
        <p className="text-gray-500 mt-1">
          Your scraping activity, system insights & data exports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <div className="p-6 rounded-2xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Create Scraper
            </h3>

            <form className="space-y-5">
              {/* Country */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Select Country
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                >
                  <option value="">Choose country</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>

              {/* Prompt */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Enter Prompt
                </label>
                <input
                  type="text"
                  placeholder="Describe what to scrape..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300 resize-none"
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    From Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    To Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974] transition-all duration-300"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition"
              >
                Create Scraper
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl shadow-md border overflow-hidden relative bg-gradient-to-br from-blue-50 to-white">
            <p className="text-md text-gray-600 font-bold">Registered Users</p>
            <h3 className="text-5xl font-bold mt-2 text-blue-700">342</h3>
            <p className="mt-3 text-sm text-[#6052a9]">+18 this month</p>
            <i className="text-[150px] text-[#6052a9] absolute bottom-[-30px] right-[-30px] opacity-15 leading-none ri-group-line"></i>
          </div>

          <div className="p-6 rounded-2xl shadow-md border overflow-hidden relative bg-gradient-to-br from-purple-50 to-white">
            <p className="text-md text-gray-600 font-bold">Total Scrape Requests</p>
            <h3 className="text-5xl font-bold mt-2 text-purple-700">1,284</h3>
            <p className="mt-3 text-sm text-purple-600">12 running now</p>
            <i className="text-[150px] text-purple-600 absolute bottom-[-30px] right-[-30px] opacity-15 leading-none ri-git-pull-request-line"></i>
          </div>

          <div className="p-6 rounded-2xl shadow-md border overflow-hidden relative bg-gradient-to-br from-green-50 to-white">
            <p className="text-md text-gray-600 font-bold">Google Sheet Sync</p>
            <h3 className="text-5xl font-semibold mt-2 text-green-700">
              Active
            </h3>
            <p className="mt-3 text-sm text-green-600">Last sync: 1 min ago</p>
            <i className="text-[150px] text-green-600 absolute bottom-[-30px] right-[-30px] opacity-15 leading-none ri-file-excel-2-line"></i>
          </div>

          <div className="p-6 rounded-2xl shadow-md border overflow-hidden relative bg-gradient-to-br from-orange-50 to-white">
            <p className="text-md text-gray-600 font-bold">Success Rate</p>
            <h3 className="text-5xl font-bold mt-2 text-orange-700">94%</h3>
            <p className="mt-3 text-sm text-orange-600">Last 7 days data</p>
             <i className="text-[150px] text-orange-600 absolute bottom-[-30px] right-[-30px] opacity-15 leading-none ri-percent-line"></i>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          Recent Scrape History
        </h3>

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
              {/* Row 1 */}
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

              {/* Row 2 */}
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

              {/* Row 3 */}
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
    </div>
  );
}
