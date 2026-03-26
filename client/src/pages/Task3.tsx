import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import JobControls from "../components/Task3/JobControls";
import JobStats from "../components/Task3/JobStats";
import JobCard from "../components/Task3/JobCard";

interface Job {
  id: string;
  status: "pending" | "done";
  result?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function Task3() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ["websocket", "polling"],
      secure: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("job_result", (data: { id: string; result: string }) => {
      setJobs((prev) => prev.map((job) => (job.id === data.id ? { ...job, status: "done", result: data.result } : job)));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startJobs = async () => {
    if (!socketRef.current) return;
    setIsStarted(true);

    const initialJobs: Job[] = Array.from({ length: 20 }, (_, i) => ({
      id: `job-${i + 1}`,
      status: "pending",
    }));
    setJobs(initialJobs);

    for (let i = 0; i < 20; i++) {
      const jobId = `job-${i + 1}`;
      await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: jobId,
          socketId: socketRef.current.id,
        }),
      });
    }
  };

  const reset = () => {
    setJobs([]);
    setIsStarted(false);
  };

  const doneCount = jobs.filter((j) => j.status === "done").length;
  const pendingCount = jobs.filter((j) => j.status === "pending").length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Task 3 — WebSocket Job Processor</h1>
        <p className="text-slate-400 text-sm mt-1">Jobs are processed in a worker thread and results arrive via WebSocket</p>
      </div>

      {/* Controls */}
      <JobControls
        isConnected={isConnected}
        isStarted={isStarted}
        doneCount={doneCount}
        totalCount={jobs.length}
        onStart={startJobs}
        onReset={reset}
      />

      {/* Stats */}
      {isStarted && jobs.length > 0 && <JobStats total={jobs.length} pending={pendingCount} done={doneCount} />}

      {/* Jobs grid */}
      {isStarted && jobs.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {jobs.map((job) => (
            <JobCard key={job.id} id={job.id} status={job.status} result={job.result} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 gap-3 bg-slate-800/30 rounded-2xl border border-slate-700/30 border-dashed">
          <span className="text-slate-400 text-sm">Click Start 20 Jobs to begin</span>
          <span className="text-slate-600 text-xs">Results arrive via WebSocket after 2 seconds each</span>
        </div>
      )}
    </div>
  );
}
