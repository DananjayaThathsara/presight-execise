interface JobControlsProps {
  isConnected: boolean;
  isStarted: boolean;
  doneCount: number;
  totalCount: number;
  onStart: () => void;
  onReset: () => void;
}

export default function JobControls({ isConnected, isStarted, doneCount, totalCount, onStart, onReset }: JobControlsProps) {
  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      {/* Socket connection status */}
      <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}></div>
        <span className="text-sm text-slate-300">{isConnected ? "Socket Connected" : "Disconnected"}</span>
      </div>

      {/* Progress bar */}
      {isStarted && totalCount > 0 && (
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 bg-slate-700 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(doneCount / totalCount) * 100}%` }}></div>
          </div>
          <span className="text-slate-400 text-xs shrink-0">
            {doneCount}/{totalCount} done
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 ml-auto">
        {isStarted && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-3xl border border-slate-600 transition-colors duration-200 cursor-pointer"
          >
            Reset
          </button>
        )}
        <button
          onClick={onStart}
          disabled={isStarted || !isConnected}
          className={`px-5 py-2 rounded-3xl text-sm font-medium transition-all duration-200 ${
            isStarted || !isConnected
              ? "bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600"
              : "bg-[#7dd3fc] hover:bg-[#60c9fa] text-white shadow-lg shadow-[#7dd3fc]/20  border-[#7dd3fc] cursor-pointer"
          }`}
        >
          Start 20 Jobs
        </button>
      </div>
    </div>
  );
}
