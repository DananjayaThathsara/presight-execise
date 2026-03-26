interface JobCardProps {
  id: string;
  status: "pending" | "done";
  result?: string;
}

export default function JobCard({ id, status, result }: JobCardProps) {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all duration-500 ${
        status === "done" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-slate-800/60 border-slate-700/50"
      }`}
    >
      {/* Job ID and status dot */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{id}</span>
        <div className={`w-2 h-2 rounded-full ${status === "done" ? "bg-emerald-400" : "bg-yellow-400 animate-pulse"}`}></div>
      </div>

      {/* Status text */}
      <div className={`text-sm font-semibold mb-2 ${status === "done" ? "text-emerald-300" : "text-yellow-400"}`}>
        {status === "done" ? "Done" : "Pending"}
      </div>

      {/* Result text */}
      {result && <div className="text-slate-400 text-xs leading-relaxed">{result}</div>}
    </div>
  );
}
