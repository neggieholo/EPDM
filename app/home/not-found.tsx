// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
            <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-lg text-gray-700 mb-6">Page not found.</p>
            <Link
                href="/home"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
}
