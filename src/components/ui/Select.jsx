/**
 * Reusable Select component
 */

export default function Select({
  label,
  value,
  onChange,
  options = [],
  required = false,
  error,
  className = '',
  ...props
}) {
  const selectClasses = `
    w-full px-4 py-3 bg-white border rounded-lg text-gray-900
    focus:outline-none focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f]
    transition-all duration-300
    ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200'}
    ${className}
  `;
  
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={selectClasses}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

