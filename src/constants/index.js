/**
 * Application-wide constants
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  HISTORY: '/dashboard/history',
  SHEET: '/dashboard/sheet',
  SETTINGS: '/dashboard/setting',
  RESET_PASSWORD: '/reset-password',
};

// UI Constants
export const COLORS = {
  PRIMARY: '#26996f',
  PRIMARY_HOVER: '#26996f',
  SECONDARY: '#26996f',
  BACKGROUND: '#f1eeff',
};

// Status Colors
export const STATUS_COLORS = {
  completed: 'bg-green-100 text-green-700',
  running: 'bg-purple-100 text-purple-700',
  queued: 'bg-purple-100 text-purple-700',
  failed: 'bg-red-100 text-red-700',
  pending: 'bg-gray-100 text-gray-700',
};

// Countries (common ones for dropdown)
export const COUNTRIES = [
  { value: '', label: 'All Countries' },
  { value: 'US', label: 'United States' },
  { value: 'IN', label: 'India' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'JP', label: 'Japan' },
];

// Ad Status Options
export const AD_STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

// Time formatting constants
export const TIME_FORMATS = {
  JUST_NOW_THRESHOLD: 60000, // 1 minute in ms
  MINUTES_THRESHOLD: 3600000, // 1 hour in ms
  HOURS_THRESHOLD: 86400000, // 1 day in ms
  DAYS_THRESHOLD: 604800000, // 7 days in ms
};

