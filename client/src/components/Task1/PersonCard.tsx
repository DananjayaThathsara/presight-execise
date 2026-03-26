import { Person } from "../../api/client";

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  if (!person) return null;
  const visibleHobbies = person.hobbies.slice(0, 2);
  const remainingCount = person.hobbies.length - 2;

  return (
    <div className="flex gap-3 p-3 bg-[#1e293b] rounded-2xl border border-[#334155] items-start">
      <img src={person.avatar} alt={person.first_name} className="" style={{ width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0 }} />
      <div className="flex-1">
        <div className="text-[#f1f5f9] font-semibold text-sm">
          {person.first_name} {person.last_name}
        </div>
        <div className="flex justify-between text-[#94a3b8] text-xs mt-1">
          <span>{person.nationality}</span>
          <span>{person.age} yrs</span>
        </div>
        {person.hobbies.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {visibleHobbies.map((h) => (
              <span key={h} className="px-2 py-1 bg-[#0f172a] text-[#7dd3fc] rounded-full text-xs border border-[#1e40af]">
                {h}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="px-2 py-1 bg-[#0f172a] text-[#94a3b8] rounded-full text-xs border border-[#334155]">+{remainingCount}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
