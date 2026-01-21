"use client";

export default function Topbar({ open, setOpen }) {
  return (
    <header className="flex justify-between items-center h-16 px-4 sm:px-6 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 w-full">
        {/* Hamburger (always visible) */}
        <button
          className="flex h-10 w-10 min-w-10 items-center justify-center rounded-lg bg-[#26996f] text-white md:hidden hover:bg-[#26996f] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Open sidebar"
        >
          <i className="ri-menu-2-line ri-lg"></i>
        </button>

        {/* Desktop expand/collapse button (visible on md+) */}
        <button
          className="hidden md:flex h-10 w-10 min-w-10 items-center justify-center rounded-lg bg-[#26996f] text-white hover:bg-[#26996f] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >
          <i className="ri-menu-2-line ri-lg"></i>
        </button>

        <div className="relative w-full xl:max-w-[430px]">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              className="fill-gray-400"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            id="search-input"
            type="text"
            placeholder="Search or type command..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] focus:outline-none transition-all"
          />
        </div>
      </div>
    </header>
  );
}
