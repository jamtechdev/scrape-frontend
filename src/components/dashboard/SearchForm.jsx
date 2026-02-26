"use client";
import Input from "@/components/ui/Input";
import SearchableSelect from "@/components/ui/SearchableSelect";
import DatePicker from "@/components/ui/DatePicker";
import Button from "@/components/ui/Button";

export default function SearchForm({
  keyword,
  country,
  dateStart,
  dateEnd,
  mostRecent,
  countryOptions,
  isProcessing,
  onKeywordChange,
  onCountryChange,
  onDateStartChange,
  onDateEndChange,
  onMostRecentChange,
  onSubmit
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Search Ads</h3>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Keyword"
            type="text"
            value={keyword}
            onChange={onKeywordChange}
            placeholder="e.g., 50% Rabatt, Winterjacke"
            required
          />

          <SearchableSelect
            label="Country"
            value={country}
            onChange={onCountryChange}
            options={countryOptions}
            required
            placeholder="Search or select country..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Start Date"
            value={dateStart}
            onChange={onDateStartChange}
            maxDate={dateEnd || undefined}
            required
          />

          <DatePicker
            label="End Date"
            value={dateEnd}
            onChange={onDateEndChange}
            minDate={dateStart || undefined}
            maxDate={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col">
            <label htmlFor="mostRecent" className="text-sm font-medium text-gray-700 cursor-pointer">
              Most Recent
            </label>
            <span className="text-xs text-gray-500 mt-0.5">Stop 3 days before start date</span>
          </div>
          <button
            type="button"
            id="mostRecent"
            onClick={() => onMostRecentChange?.(!mostRecent)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#26996f] focus:ring-offset-2 ${
              mostRecent ? 'bg-[#26996f]' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={mostRecent || false}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                mostRecent ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isProcessing}
          className="w-full md:w-auto"
        >
          {isProcessing ? "In Progress..." : "Search Ads"}
        </Button>
      </form>
    </div>
  );
}

