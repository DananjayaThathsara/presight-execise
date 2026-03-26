interface StreamOutputProps {
  streamedText: string;
}

export default function StreamOutput({ streamedText }: StreamOutputProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
        <span className="text-slate-400 text-xs uppercase tracking-wider">Live Output</span>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
        {streamedText}
        <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle"></span>
      </div>
    </div>
  );
}
