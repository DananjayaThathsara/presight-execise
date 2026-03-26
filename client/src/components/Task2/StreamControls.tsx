interface StreamControlsProps {
  isStreaming: boolean;
  isDone: boolean;
  onStart: () => void;
  onReset: () => void;
}

export default function StreamControls({ isStreaming, isDone, onStart, onReset }: StreamControlsProps) {
  return (
    <div className="flex items-center gap-3 mb-6 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      {/* Status indicator */} 
      <div className="flex items-center gap-2 flex-1">
        <div className={`w-2.5 h-2.5 rounded-full ${isDone ? "bg-emerald-400" : isStreaming ? "bg-blue-400 animate-pulse" : "bg-slate-600"}`}></div>
        <span className="text-sm text-slate-300">{isDone ? "Stream complete" : isStreaming ? "Streaming..." : "Ready to stream"}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        {(isStreaming || isDone) && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-3xl border border-slate-600 transition-colors duration-200 cursor-pointer"
          >
            Reset
          </button>
        )}
        <button
          onClick={onStart}
          disabled={isStreaming}
          className={`px-5 py-2 rounded-3xl text-sm font-medium transition-all duration-200 ${
            isStreaming
              ? "bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600"
              : "bg-[#7dd3fc] hover:bg-[#60c9fa] text-white shadow-lg shadow-[#7dd3fc]/20 border border-[#7dd3fc] cursor-pointer"
          }`}
        >
          {isStreaming ? "Streaming..." : "Start Stream"}
        </button>
      </div>
    </div>
  );
}
