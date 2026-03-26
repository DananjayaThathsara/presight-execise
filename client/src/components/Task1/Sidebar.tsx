interface FilterItem {
  name: string;
  count: number;
}

interface SidebarProps {
  topNationalities: FilterItem[];
  topHobbies: FilterItem[];
  selectedNationality: string;
  selectedHobby: string;
  onNationalityChange: (value: string) => void;
  onHobbyChange: (value: string) => void;
}

export default function Sidebar({
  topNationalities,
  topHobbies,
  selectedNationality,
  selectedHobby,
  onNationalityChange,
  onHobbyChange,
}: SidebarProps) {
  return (
    <div className="w-60 overflow-y-auto p-4 border-r border-[#334155] shrink-0">
      <h3 className="text-[#f1f5f9] mb-4">Filters</h3>

      {(selectedHobby || selectedNationality) && (
        <button
          onClick={() => {
            onNationalityChange("");
            onHobbyChange("");
          }}
          className="mb-3 px-3 py-1 bg-red-400 text-white rounded-xl text-xs hover:cursor-pointer hover:bg-red-500 transition-colors duration-200"
        >
          Clear Filters
        </button>
      )}

      <div className="mb-6">
        <p className="text-[#94a3b8] text-xs mb-2 uppercase tracking-wide rounded-md bg-blue-950 p-2">Nationality</p>
        {topNationalities.map((n) => (
          <div
            key={n.name}
            onClick={() => onNationalityChange(selectedNationality === n.name ? "" : n.name)}
            className={`mb-2 px-2 py-1 rounded-xl text-sm flex justify-between items-center cursor-pointer ${selectedNationality === n.name ? "bg-[#61c0ed] text-white" : "text-slate-200 hover:text-slate-200 hover:bg-slate-700"}`}
          >
            <span>{n.name}</span>
            <span className="text-[#c1c2c5] text-[11px]">{n.count}</span>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[#94a3b8] text-xs mb-2 uppercase tracking-wide rounded-md bg-blue-950 p-2">Hobbies</p>
        {topHobbies.map((h) => (
          <div
            key={h.name}
            onClick={() => onHobbyChange(selectedHobby === h.name ? "" : h.name)}
            className={`mb-2 px-2 py-1 rounded-xl text-sm flex justify-between items-center cursor-pointer ${selectedHobby === h.name ? "bg-[#7dd3fc] text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"}`}
          >
            <span>{h.name}</span>
            <span className="text-[#c1c2c5] text-[11px]">{h.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
