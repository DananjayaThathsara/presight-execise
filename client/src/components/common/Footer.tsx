export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/95 mt-auto">
      <div className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-700 to-green-700 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-slate-400 text-sm">Presight Frontend Exercise</span>
        </div>

        {/* Middle */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-slate-400 text-xs">Task 1 — Virtual Scroll</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-slate-400 text-xs">Task 2 — HTTP Stream</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></div>
            <span className="text-slate-400 text-xs">Task 3 — WebSocket</span>
          </div>
        </div>

        {/* Right side */}
        <div className="text-slate-500 text-xs">Built with React + Node.js</div>
      </div>
    </footer>
  );
}
