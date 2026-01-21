"use client";

export default function CoverageInfo({ coverage }) {
  if (!coverage) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Coverage Status</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div>
          <p className="text-sm text-gray-500">Keyword</p>
          <p className="font-semibold text-gray-900">{coverage.keyword}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Country</p>
          <p className="font-semibold text-gray-900">{coverage.country}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Coverage</p>
          <p className="font-semibold text-gray-900">
            {coverage.isComplete ? (
              <span className="text-green-600">100% Complete</span>
            ) : (
              <span className="text-yellow-600">{coverage.coveragePercentage}%</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Ads</p>
          <p className="font-semibold text-gray-900">{coverage.totalAds || 0}</p>
        </div>
      </div>
    </div>
  );
}

