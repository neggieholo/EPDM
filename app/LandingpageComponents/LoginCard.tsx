'use client';

import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import resendVerificationMail from "../utils/LandingPageFetchers";
import { verifyEmailToken } from "../utils/SignUpFetchers";

const LoginCard: React.FC = () => {
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
                        toast.error(response?.error || "Invalid or expired verification token.");
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
        <section className="w-full min-h-screen flex flex-col items-center justify-center bg-white py-20">
            {verificationLoading && <p>Verifying email...</p>}
            <div className="w-[90%] sm:w-[450px] bg-accent/50 p-8 border border-accent/20">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <div>
                            <input
                                type="text"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value.trim())}
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border border-accent/30 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                                />
                        </div>
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
                                className="w-full px-4 py-2 border border-accent/30 rounded-md focus:outline-none focus:ring-2 
                                focus:ring-accent pr-12 bg-gray-100"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-sm text-accent font-semibold"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 mt-3">
                        <button
                            type="submit"
                            className="bg-accent text-white font-semibold py-2 rounded-md hover:bg-accent/90 transition"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        {showResend && (
                            <button
                                type="button"
                                onClick={() => resendVerificationMail(username)}
                                className="bg-secondary text-white font-semibold py-2 rounded-md hover:bg-secondary/90 transition"
                            >
                                Request Verification Email
                            </button>
                        )}

                        <a
                            href="/forgotpassword"
                            target="_blank"
                            className="text-primary text-center text-sm hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>

                {/* {errorMessage && (
                    <p className="text-center text-red-500 text-sm mt-4">
                        {errorMessage}
                    </p>
                )} */}
            </div>
        </section>
    );
};

export default LoginCard;
