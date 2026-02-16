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
  countryOptions,
  isScraping,
  onKeywordChange,
  onCountryChange,
  onDateStartChange,
  onDateEndChange,
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
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isScraping}
          className="w-full md:w-auto"
        >
          {isScraping ? "Scraping in Progress..." : "Search Ads"}
        </Button>
      </form>
    </div>
  );
}

