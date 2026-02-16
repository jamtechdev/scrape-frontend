"use client";
import { useState, useRef, useEffect } from "react";

export default function SearchableSelect({
  label,
  value,
  onChange,
  options = [],
  required = false,
  error,
  className = '',
  placeholder = "Search or select...",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && dropdownRef.current && highlightedIndex >= 0) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (option) => {
    onChange({ target: { value: option.value } });
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;
    }
  };

  const selectClasses = `
    w-full px-4 py-3 bg-white border rounded-lg text-gray-900
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
          className={selectClasses}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center justify-between">
            <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
            <div className="p-2 border-b border-gray-200">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search country..."
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div
              ref={dropdownRef}
              className="max-h-48 overflow-y-auto"
              role="listbox"
            >
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No countries found
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-4 py-2 cursor-pointer transition-colors ${
                      option.value === value
                        ? "bg-[#26996f] text-white"
                        : highlightedIndex === index
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    {option.label}
                  </div>
                ))
              )}
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
