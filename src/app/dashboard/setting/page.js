"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getMe } from "@/services/auth.service";
import { get, put } from "@/services/api";
import { handleApiError, getErrorMessage } from "@/utils/errorHandler";

export default function Setting() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user: authUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });


  // Environment variables state
  const [envLoading, setEnvLoading] = useState(false);
  const [envSaving, setEnvSaving] = useState(false);
  const [envVariables, setEnvVariables] = useState({});
  const [envCategories, setEnvCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [envChanges, setEnvChanges] = useState({});

  useEffect(() => {
    if (!authUser) {
      router.push('/login');
      return;
    }
    
    loadUserData();
    loadEnvVariables();
  }, [authUser, router, searchParams]);

  const loadUserData = async () => {
    if (!authUser) {
      return;
    }
    
    try {
      const response = await getMe();
      if (response && response.data && response.data.user) {
        const userData = response.data.user;
        setName(userData.name || "");
        setEmail(userData.email || "");
      } else if (authUser) {
        setName(authUser.name || "");
        setEmail(authUser.email || "");
      }
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        return;
      }
      const errorInfo = handleApiError(err);
      if (authUser) {
        setName(authUser.name || "");
        setEmail(authUser.email || "");
      }
      setMessage({ type: "error", text: errorInfo.message || "Failed to load user data" });
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
      const errorInfo = handleApiError(err);
      setMessage({ type: "error", text: errorInfo.message || "Failed to update profile" });
    } finally {
      setSaving(false);
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
      const errorInfo = handleApiError(err);
      setMessage({ type: "error", text: errorInfo.message || "Failed to update password" });
    } finally {
      setSaving(false);
    }
  };

  // Environment Variables Functions
  const loadEnvVariables = async () => {
    try {
      setEnvLoading(true);
      const response = await get('/env');
      if (response && response.code === 200 && response.data) {
        setEnvVariables(response.data.variables || {});
        setEnvCategories(['All', ...(response.data.categories || [])]);
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setMessage({ type: "error", text: errorInfo.message || "Failed to load environment variables" });
    } finally {
      setEnvLoading(false);
    }
  };

  const handleEnvChange = (key, value) => {
    setEnvChanges(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveEnvVariables = async (e) => {
    e.preventDefault();
    try {
      setEnvSaving(true);
      setMessage({ type: "", text: "" });

      const response = await put('/env', { variables: envChanges });

      if (response && response.code === 200) {
        setMessage({ type: "success", text: "Environment variables updated successfully! Please restart the server for changes to take full effect." });
        setEnvChanges({});
        // Reload environment variables to get updated values
        await loadEnvVariables();
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setMessage({ type: "error", text: errorInfo.message || "Failed to update environment variables" });
    } finally {
      setEnvSaving(false);
    }
  };

  const getFilteredEnvVariables = () => {
    const vars = Object.entries(envVariables);
    if (selectedCategory === "All") {
      return vars;
    }
    return vars.filter(([key, data]) => data.category === selectedCategory);
  };



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
        <div className={`mb-6 px-4 py-3 rounded-lg message-auto-hide ${
          message.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-700" 
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {message.text}
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
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
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
              autoComplete="name"
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
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSaveProfile}
          disabled={saving}
          className="mt-6 w-full sm:w-auto px-5 py-2.5 bg-[#26996f] text-white rounded-lg font-semibold hover:bg-[#26996f] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
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
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
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
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
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
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
            />
          </div>

          {/* Save Button */}
          <button 
            type="submit"
            disabled={saving}
            className="mt-6 w-full sm:w-auto px-5 py-2.5 bg-[#26996f] text-white rounded-lg font-semibold hover:bg-[#26996f] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {saving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>


      {/* Privacy Policy Link */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Legal & Privacy
        </h2>
        <div className="flex items-center gap-4">
          <Link 
            href="/privacy-policy" 
            className="text-[#26996f] hover:text-[#26996f] font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <i className="ri-file-shield-line"></i>
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Environment Variables Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Environment Variables
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Manage application configuration. Changes require server restart to take effect.
        </p>

        {(
          <>
            {/* Category Filter */}
            {envCategories.length > 1 && (
              <div className="mb-6">
                <label className="block text-gray-600 mb-2 font-medium">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
                >
                  {envCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <form onSubmit={handleSaveEnvVariables}>
              <div className="space-y-6">
                {getFilteredEnvVariables().map(([key, data]) => {
                  const currentValue = envChanges.hasOwnProperty(key) ? envChanges[key] : (data.value || '');
                  const isSensitive = data.sensitive;
                  const inputType = isSensitive ? 'password' : (data.type === 'number' ? 'number' : 'text');

                  return (
                    <div key={key} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <label className="block text-gray-700 font-medium mb-1">
                            {key}
                            {data.category && (
                              <span className="ml-2 text-xs text-gray-500 font-normal">
                                ({data.category})
                              </span>
                            )}
                          </label>
                          {data.description && (
                            <p className="text-xs text-gray-500 mb-2">{data.description}</p>
                          )}
                        </div>
                      </div>

                      {data.options ? (
                        <select
                          value={currentValue}
                          onChange={(e) => handleEnvChange(key, e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
                        >
                          <option value="">-- Select --</option>
                          {data.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={inputType}
                          value={isSensitive && currentValue === '***' ? '' : currentValue}
                          onChange={(e) => handleEnvChange(key, e.target.value)}
                          placeholder={isSensitive && currentValue === '***' ? 'Enter new value to update' : data.description || ''}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#26996f] focus:border-[#26996f] outline-none transition-all"
                        />
                      )}

                      {data.type && (
                        <p className="text-xs text-gray-400 mt-1">
                          Type: {data.type}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {Object.keys(envChanges).length > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <button
                    type="submit"
                    disabled={envSaving}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#26996f] text-white rounded-lg font-semibold hover:bg-[#26996f] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {envSaving ? "Saving..." : "Save Environment Variables"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEnvChanges({});
                      loadEnvVariables();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <span className="text-sm text-gray-500 text-center sm:text-left">
                    {Object.keys(envChanges).length} variable(s) modified
                  </span>
                </div>
              )}

              {Object.keys(envChanges).length === 0 && (
                <div className="mt-6 text-sm text-gray-500 text-center">
                  No changes made. Modify values above to save.
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
