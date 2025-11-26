export default function Loading() {
    return (
        <div className="w-full min-h-screen bg-base-100 p-4 animate-pulse">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header skeleton */}
                <div className="h-6 w-40 bg-base-300 rounded-lg" />

                {/* Card skeletons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="h-28 bg-base-300 rounded-xl" />
                    <div className="h-28 bg-base-300 rounded-xl" />
                </div>

                {/* Large content block */}
                <div className="h-64 bg-base-300 rounded-xl" />

                {/* List skeleton */}
                <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-base-300 rounded-md" />
                    <div className="h-4 w-2/3 bg-base-300 rounded-md" />
                    <div className="h-4 w-1/2 bg-base-300 rounded-md" />
                </div>
            </div>
        </div>
    );
}
