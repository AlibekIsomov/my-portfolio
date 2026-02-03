export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin" />
                <p className="font-mono text-slate-500 animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
