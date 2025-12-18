"use client";

export default function TabSwitcher({ activeTab, onTabChange }) {
  return (
    <div className="flex mb-8 p-2 rounded-full bg-[#f1eeff]">
      <button
        type="button"
        onClick={() => onTabChange("login")}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
          activeTab === "login" || activeTab === "forgot"
            ? "bg-[#433974] text-white shadow-md"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onTabChange("register")}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
          activeTab === "register"
            ? "bg-[#433974] text-white shadow-md"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}

