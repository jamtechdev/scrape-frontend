/**
 * Reusable Input component
 */

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
  ...props
}) {
  const inputClasses = `
    w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-[#433974] focus:border-[#433974]
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
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

