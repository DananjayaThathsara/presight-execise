type ActiveTask = "task1" | "task2" | "task3";

const TABS: { id: ActiveTask; label: string }[] = [
  { id: "task1", label: "Task 1" },
  { id: "task2", label: "Task 2" },
  { id: "task3", label: "Task 3" },
];

interface NavbarProps {
  activeTask: ActiveTask;
  onTaskChange: (task: ActiveTask) => void;
}

interface NavTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// Component for individual navigation tab
function NavTab({ label, isActive, onClick }: NavTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-4xl text-sm font-medium transition-all duration-200 ${
        isActive ? "bg-[#7dd3fc] text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700 hover:cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}

export default function Navbar({ activeTask, onTaskChange }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 shadow-xl">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-green-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-base">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-base leading-tight">Presight</span>
            <span className="text-slate-400 text-xs leading-tight">Frontend Exercise</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-3 mb-3 bg-slate-800/80 rounded-3xl p-1 border border-slate-700/50" style={{padding:"10px"}}>
          {TABS.map((tab) => (
            <NavTab key={tab.id} label={tab.label} isActive={activeTask === tab.id} onClick={() => onTaskChange(tab.id)} />
          ))}
        </div>
      </div>
    </nav>
  );
}
