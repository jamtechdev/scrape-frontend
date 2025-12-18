/**
 * Utility functions for formatting data
 */

/**
 * Format date to relative time (e.g., "2h ago", "3d ago")
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '—';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

/**
 * Format date to readable string
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str, maxLength = 50) {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '—';
  return num.toLocaleString('en-US');
}

/**
 * Get status color class
 */
export function getStatusColor(status) {
  const statusColors = {
    completed: 'bg-green-100 text-green-700',
    running: 'bg-purple-100 text-purple-700',
    queued: 'bg-purple-100 text-purple-700',
    failed: 'bg-red-100 text-red-700',
    pending: 'bg-gray-100 text-gray-700',
  };
  return statusColors[status] || statusColors.pending;
}

