interface JobStatsProps {
  total: number;
  pending: number;
  done: number;
}

export default function JobStats({ total, pending, done }: JobStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 text-center">
        <div className="text-2xl font-bold text-slate-100">{total}</div>
        <div className="text-slate-500 text-xs mt-0.5">Total Jobs</div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-3 border border-yellow-500/20 text-center">
        <div className="text-2xl font-bold text-yellow-400">{pending}</div>
        <div className="text-slate-500 text-xs mt-0.5">Pending</div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-3 border border-emerald-500/20 text-center">
        <div className="text-2xl font-bold text-emerald-400">{done}</div>
        <div className="text-slate-500 text-xs mt-0.5">Completed</div>
      </div>
    </div>
  );
}
