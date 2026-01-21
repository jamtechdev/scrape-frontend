"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/services/api";
import { searchAds } from "@/services/ads.service";
import { handleApiError } from "@/utils/errorHandler";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing Google authorization...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get authorization code from URL
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const fromSearch = searchParams.get("from") === "search";

        if (error) {
          setStatus("error");
          setMessage(`Authorization failed: ${error}`);
          setTimeout(() => {
            if (fromSearch) {
              router.push("/dashboard?oauth=error");
            } else {
              router.push("/dashboard/setting?oauth=error");
            }
          }, 3000);
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("No authorization code received from Google.");
          setTimeout(() => {
            if (fromSearch) {
              router.push("/dashboard?oauth=error");
            } else {
              router.push("/dashboard/setting?oauth=error");
            }
          }, 3000);
          return;
        }

        // Exchange code for refresh token
        setMessage("Exchanging authorization code for token...");
        // Get the redirect URI that was used (same as the one in the OAuth URL)
        const frontendUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
        const redirectUri = `${frontendUrl}/google-oauth-callback${fromSearch ? "?from=search" : ""}`;
        const response = await post("/ads/google-sheets/oauth-callback", { code, redirect_uri: redirectUri });

        if (response && response.code === 200) {
          setStatus("success");
          
          // Check if there are pending search parameters
          const pendingSearchParams = localStorage.getItem("pendingSearchParams");
          
          if (fromSearch && pendingSearchParams) {
            try {
              const searchParams = JSON.parse(pendingSearchParams);
              setMessage("Google account connected! Starting search...");
              
              // Clear pending search params
              localStorage.removeItem("pendingSearchParams");
              
              // Trigger search automatically
              const searchResponse = await searchAds(searchParams);
              
              if (searchResponse.code === 200 || searchResponse.code === 202) {
                // Store search response data for dashboard to pick up
                if (searchResponse.data?.job?.id) {
                  localStorage.setItem("pendingSearchJobId", searchResponse.data.job.id);
                }
                if (searchResponse.data?.coverage?.id) {
                  localStorage.setItem("pendingSearchCoverageId", searchResponse.data.coverage.id);
                }
                
                setMessage("Search started successfully! Redirecting to dashboard...");
                setTimeout(() => {
                  router.push("/dashboard?search=started");
                }, 1500);
              } else {
                setMessage("Google account connected! Redirecting to dashboard...");
                setTimeout(() => {
                  router.push("/dashboard?oauth=success");
                }, 2000);
              }
            } catch (searchErr) {
              console.error("Error starting search:", searchErr);
              setMessage("Google account connected! Redirecting to dashboard...");
              setTimeout(() => {
                router.push("/dashboard?oauth=success");
              }, 2000);
            }
          } else {
            setMessage("Google account connected successfully! Redirecting...");
            setTimeout(() => {
              router.push("/dashboard/setting?oauth=success");
            }, 2000);
          }
        } else {
          throw new Error(response?.message || "Failed to exchange authorization code");
        }
      } catch (err) {
        const errorInfo = handleApiError(err);
        setStatus("error");
        setMessage(errorInfo.message || "Failed to connect Google account. Please try again.");
        setTimeout(() => {
          const fromSearch = searchParams.get("from") === "search";
          if (fromSearch) {
            router.push("/dashboard?oauth=error");
          } else {
            router.push("/dashboard/setting?oauth=error");
          }
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#26996f] to-[#26996f]">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {status === "processing" && (
            <>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#26996f] border-t-transparent mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Connecting Google Account
              </h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Success!
              </h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Connection Failed
              </h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => router.push("/dashboard/setting")}
                className="px-4 py-2 bg-[#26996f] text-white rounded-lg hover:bg-[#26996f] transition"
              >
                Go to Settings
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GoogleOAuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#26996f] to-[#26996f]">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#26996f] border-t-transparent mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Loading...
            </h2>
            <p className="text-gray-600">Processing Google authorization...</p>
          </div>
        </div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
