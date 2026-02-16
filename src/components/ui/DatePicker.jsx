"use client";
import { useState, useRef, useEffect, useMemo } from "react";

export default function DatePicker({
  label,
  value,
  onChange,
  required = false,
  error,
  className = '',
  minDate,
  maxDate,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (value) {
      const date = new Date(value);
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });
  const containerRef = useRef(null);

  const selectedDate = useMemo(() => {
    return value ? new Date(value) : null;
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      const newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      setCurrentMonth(prevMonth => {
        const prevMonthStart = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1);
        if (newMonth.getTime() !== prevMonthStart.getTime()) {
          return newMonth;
        }
        return prevMonth;
      });
    }
  }, [value]);

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(newDate)) {
      onChange({ target: { value: formatDate(newDate) } });
      setIsOpen(false);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1)
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    if (!isDateDisabled(today)) {
      onChange({ target: { value: formatDate(today) } });
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    days.push(day);
  }

  const inputClasses = `
    w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f]
    transition-all duration-300 cursor-pointer
    ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200'}
    ${className}
  `;

  return (
    <div className="flex flex-col space-y-1 relative" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div
          className={inputClasses}
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between">
            <span className={value ? "text-gray-900" : "text-gray-500"}>
              {value || "Select date"}
            </span>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-2.5 max-w-[280px]">
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2 px-1">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                  type="button"
                  aria-label="Previous month"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-xs font-semibold text-gray-900 px-2">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                  type="button"
                  aria-label="Next month"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-0.5 mb-1.5">
                {dayNames.map((day, idx) => (
                  <div
                    key={`${day}-${idx}`}
                    className="text-[10px] font-semibold text-gray-500 text-center py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="h-7" />;
                  }
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const disabled = isDateDisabled(date);
                  const selected = isDateSelected(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={disabled}
                      className={`
                        h-7 w-7 text-xs rounded-md transition-all duration-150
                        flex items-center justify-center font-medium
                        ${disabled
                          ? "text-gray-300 cursor-not-allowed"
                          : selected
                          ? "bg-[#26996f] text-white font-semibold shadow-sm scale-105"
                          : isToday
                          ? "bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={goToToday}
                type="button"
                className="mt-2 w-full text-[10px] text-[#26996f] hover:text-[#1e7a5a] font-medium py-1.5 hover:bg-gray-50 rounded-md transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}

      <input
        type="hidden"
        value={value || ""}
        required={required}
        {...props}
      />
    </div>
  );
}
