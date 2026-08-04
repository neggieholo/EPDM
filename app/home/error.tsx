'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>

            {error?.message && (
                <p className="text-gray-600 max-w-md mb-6">{error.message}</p>
            )}

            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-accent text-white rounded-md hover:opacity-90"
            >
                Try Again
            </button>
        </div>
    );
}
