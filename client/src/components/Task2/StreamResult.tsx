interface StreamResultProps {
  finalText: string;
}

export default function StreamResult({ finalText }: StreamResultProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
        <span className="text-slate-400 text-xs uppercase tracking-wider">Full Response</span>
        <span className="text-emerald-400 text-xs ml-auto">✓ {finalText.length.toLocaleString()} characters received</span>
      </div>
      <div className="bg-slate-800/60 border border-emerald-500/20 rounded-2xl p-5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
        {finalText}
      </div>
    </div>
  );
}
