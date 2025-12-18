"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getMe } from "@/services/auth.service";
import { get, put } from "@/services/api";

export default function Setting() {
  const { user: authUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load user data
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const response = await getMe();
      if (response && response.data && response.data.user) {
        const userData = response.data.user;
        setName(userData.name || "");
        setEmail(userData.email || "");
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      setMessage({ type: "error", text: "Failed to load user data" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const response = await put('/auth/profile', { name, email });
      
      if (response && response.code === 200) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        // Update auth context if needed
        if (response.data && response.data.user) {
          const updatedUser = { ...authUser, ...response.data.user };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage({ type: "error", text: err.message || "Failed to update profile" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const response = await put('/auth/password', { 
        currentPassword, 
        newPassword 
      });
      
      if (response && response.code === 200) {
        setMessage({ type: "success", text: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setMessage({ type: "error", text: err.message || "Failed to update password" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#433974]"></div>
          <p className="mt-4 text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences and profile settings.
        </p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`mb-6 px-4 py-3 rounded-lg ${
          message.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-700" 
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSaveProfile}
          disabled={saving}
          className="mt-6 px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Password */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-6">
            <label className="block text-gray-600 mb-1 font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#433974] outline-none"
            />
          </div>

          {/* Save Button */}
          <button 
            type="submit"
            disabled={saving}
            className="mt-6 px-5 py-2.5 bg-[#433974] text-white rounded-lg font-medium hover:bg-[#5145a3] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
