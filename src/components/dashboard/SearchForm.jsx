"use client";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function SearchForm({
  keyword,
  country,
  dateStart,
  dateEnd,
  countryOptions,
  loading,
  isScraping,
  onKeywordChange,
  onCountryChange,
  onDateStartChange,
  onDateEndChange,
  onSubmit
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Search Ads</h3>
      
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

          <Select
            label="Country"
            value={country}
            onChange={onCountryChange}
            options={countryOptions}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={dateStart}
            onChange={onDateStartChange}
            required
          />

          <Input
            label="End Date"
            type="date"
            value={dateEnd}
            onChange={onDateEndChange}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading || isScraping}
          className="w-full md:w-auto"
        >
          {isScraping ? "Scraping in Progress..." : "Search Ads"}
        </Button>
      </form>
    </div>
  );
}

