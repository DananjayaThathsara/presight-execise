import { useState, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { usePeople } from "../hooks/usePeople";
import PersonCard from "../components/Task1/PersonCard";
import Sidebar from "../components/Task1/Sidebar";

export default function Task1() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedHobby, setSelectedHobby] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");

  // Debounce search input to avoid too many requests while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { allPeople, filters, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = usePeople({
    search: debouncedSearch,
    hobby: selectedHobby,
    nationality: selectedNationality,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allPeople.length + 1 : allPeople.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;
    if (lastItem.index >= allPeople.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualItems, allPeople.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="" style={{ display: "flex", height: "calc(100vh - 120px)" }}>
      {/* Sidebar — filter by nationality and hobby */}
      <Sidebar
        topNationalities={filters?.topNationalities ?? []}
        topHobbies={filters?.topHobbies ?? []}
        selectedNationality={selectedNationality}
        selectedHobby={selectedHobby}
        onNationalityChange={setSelectedNationality}
        onHobbyChange={setSelectedHobby}
      />

      {/* Main content area */}
      <div className="" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Search bar */}
        <div style={{ padding: "16px", borderBottom: "1px solid #334155" }}>
          <input
            type="text"
            placeholder="Search by first or last name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1e293b] border border-[#334155] rounded-3xl text-[#f1f5f9] text-sm outline-none box-border"
          />
        </div>

        {/* Results count */}
        <div style={{ padding: "8px 16px", color: "#64748b", fontSize: "13px" }}>
          {isLoading ? "Loading..." : `${allPeople.length} people loaded`}
        </div>

        <div ref={parentRef} style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
          {isLoading ? (
            <div style={{ color: "#64748b", padding: "32px", textAlign: "center" }}>Loading people...</div>
          ) : (
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                position: "relative",
              }}
            >
              {virtualItems.map((virtualItem) => {
                const isLoaderRow = virtualItem.index >= allPeople.length;
                const person = allPeople[virtualItem.index];

                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      transform: `translateY(${virtualItem.start}px)`,
                      padding: "4px 0",
                    }}
                  >
                    {isLoaderRow ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "16px",
                          color: "#64748b",
                        }}
                      >
                        Loading more...
                      </div>
                    ) : person ? (
                      <PersonCard person={person} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
