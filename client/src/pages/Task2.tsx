import { useState, useRef } from "react";
import StreamControls from "../components/Task2/StreamControls";
import StreamOutput from "../components/Task2/StreamOutput";
import StreamResult from "../components/Task2/StreamResult";

export default function Task2() {
  const [streamedText, setStreamedText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const charQueueRef = useRef<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStream = async () => {
    setStreamedText("");
    setFinalText("");
    setIsDone(false);
    setIsStreaming(true);
    charQueueRef.current = [];

    intervalRef.current = setInterval(() => {
      if (charQueueRef.current.length > 0) {
        const char = charQueueRef.current.shift()!;
        setStreamedText((prev) => prev + char);
      }
    }, 30);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stream`);
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          const drainInterval = setInterval(() => {
            if (charQueueRef.current.length === 0) {
              clearInterval(drainInterval);
              clearInterval(intervalRef.current!);
              setIsDone(true);
              setFinalText(fullText);
              setIsStreaming(false);
            }
          }, 50);
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        charQueueRef.current.push(...chunk.split(""));
      }
    } catch (err) {
      console.error("Stream error:", err);
      setIsStreaming(false);
    }
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    charQueueRef.current = [];
    setStreamedText("");
    setFinalText("");
    setIsStreaming(false);
    setIsDone(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Task 2 — HTTP Stream Reader</h1>
        <p className="text-slate-400 text-sm mt-1">Reads a streaming response and displays it one character at a time</p>
      </div>

      {/* Controls */}
      <StreamControls isStreaming={isStreaming} isDone={isDone} onStart={startStream} onReset={reset} />

      {/* Live output while streaming */}
      {isStreaming && <StreamOutput streamedText={streamedText} />}

      {/* Full response when done */}
      {isDone && <StreamResult finalText={finalText} />}

      {/* Empty state */}
      {!isStreaming && !isDone && (
        <div className="flex flex-col items-center justify-center h-48 gap-3 bg-slate-800/30 rounded-2xl border border-slate-700/30 border-dashed">
                    <span className="text-slate-400 text-sm">Click Start Stream to begin</span>
          <span className="text-slate-600 text-xs">32 paragraphs of text will stream in</span>
        </div>
      )}
    </div>
  );
}
