"use client";

export default function TabSwitcher({ activeTab, onTabChange }) {
  return (
    <div className="flex mb-8 p-2 rounded-full bg-white/5 border border-white/10">
      <button
        type="button"
        onClick={() => onTabChange("login")}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
          activeTab === "login" || activeTab === "forgot"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => onTabChange("register")}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
          activeTab === "register"
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}

