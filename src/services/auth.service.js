/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { post, get } from './api';

/**
 * Register a new user
 * @param {Object} credentials - User credentials
 * @param {string} credentials.name - User name
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Response with tokens and user data
 */
export async function register(credentials) {
  const response = await post('/auth/register', {
    name: credentials.name,
    email: credentials.email,
    password: credentials.password,
  });
  return response;
}

/**
 * Login user
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Response with tokens and user data
 */
export async function login(credentials) {
  const response = await post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  return response;
}

/**
 * Logout user
 * @returns {Promise<Object>} Response message
 */
export async function logout() {
  const response = await post('/auth/logout');
  return response;
}

/**
 * Get current user information
 * @returns {Promise<Object>} User data
 */
export async function getMe() {
  const response = await get('/auth/me');
  return response;
}

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise<Object>} Response message
 */
export async function forgotPassword(email) {
  const response = await post('/auth/forget-password', {
    email,
  });
  return response;
}

/**
 * Verify OTP for password reset
 * @param {string} email - User email
 * @param {string} otp - 6-digit OTP
 * @returns {Promise<Object>} Verification result
 */
export async function verifyOTP(email, otp) {
  const response = await post('/auth/verify-otp', {
    email,
    otp,
  });
  return response;
}

/**
 * Reset password with OTP
 * @param {Object} resetData - Reset password data
 * @param {string} resetData.email - User email
 * @param {string} resetData.otp - 6-digit OTP
 * @param {string} resetData.newPassword - New password
 * @param {string} resetData.confirmPassword - Confirm password
 * @returns {Promise<Object>} Response message
 */
export async function resetPassword(resetData) {
  const response = await post('/auth/reset-password', {
    email: resetData.email,
    otp: resetData.otp,
    newPassword: resetData.newPassword,
    confirmPassword: resetData.confirmPassword,
  });
  return response;
}

export default {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,
};

