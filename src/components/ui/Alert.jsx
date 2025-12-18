/**
 * Reusable Alert component
 */

export default function Alert({ variant = 'info', type, message, onClose, className = '' }) {
  // Support both 'variant' and 'type' props for backward compatibility
  const alertType = variant || type || 'info';
  
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  };
  
  const classes = `p-3 border rounded-lg text-sm ${variants[alertType]} ${className}`;
  
  return (
    <div className={classes}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100"
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

