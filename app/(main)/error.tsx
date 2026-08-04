// app/error.tsx
"use client";

import React from "react";
import Link from "next/link";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
            <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Something went wrong. Please try again.
            </p>
            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Retry
                </button>
                <Link
                    href="/"
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                    Go Home
                </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">{error.message}</p>
        </div>
    );
};

export default ErrorPage;
