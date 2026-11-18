/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import resendVerificationMail from "@/app/utils/LandingPageFetchers";
import { verifyEmailToken } from "@/app/utils/SignUpFetchers";

const MobLoginCard: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      (async () => {
        try {
          setVerificationLoading(true);
          const response = await verifyEmailToken(token);

          if (response?.success) {
            toast.success("Email verified successfully! You can now log in.");
          } else {
            toast.error(
              response?.error || "Invalid or expired verification token.",
            );
          }
        } catch (error: any) {
          console.error(error);
          toast.error("Error verifying email.");
        } finally {
          setVerificationLoading(false);

          // Clear token from URL without refreshing
          const url = new URL(window.location.href);
          url.searchParams.delete("token");
          router.replace(url.pathname + url.search);
        }
      })();
    }
  }, [searchParams, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const response = await res.json();

      if (!res.ok || response.error) {
        setErrorMessage(response.error || "Invalid login");
        toast.error(response.error || "Invalid login");
        return;
      }

      if (response.message) {
        toast.error(response.message);
        setShowResend(true);
        return;
      }

      if (response.success) {
        toast.success("Login successful!");
        (e.target as HTMLFormElement).reset();
        router.push("/home");
      }
    } catch (err: any) {
      console.error("Error:", err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  return (
    <section className="bg-white w-full min-h-[80vh] px-5 py-10">
      {/* Heading */}
      <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
        <h1 className="text-4xl font-extrabold text-white text-center">
          LOGIN
        </h1>
      </div>

      {/* Login Form */}
      <div className="w-full bg-accent/50 border border-accent/20 rounded-lg p-6 mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent pr-16 bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-accent font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-2">
            <button
              type="submit"
              className="bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary/90 transition disabled:opacity-60"
              disabled={isLoading || verificationLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {showResend && (
              <button
                type="button"
                onClick={() => resendVerificationMail(username)}
                className="bg-secondary text-white font-semibold py-3 rounded-md hover:bg-secondary/90 transition"
              >
                Request Verification Email
              </button>
            )}

            <a
              href="/forgotpassword"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-center text-sm hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-center text-red-500 text-sm mt-4">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default MobLoginCard;
