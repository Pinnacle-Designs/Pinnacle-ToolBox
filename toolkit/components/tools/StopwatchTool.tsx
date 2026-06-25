"use client";

import { useEffect, useRef, useState } from "react";
import { ToolButton, StatCard } from "@/components/tools/ui";

interface Lap {
  id: number;
  lapTime: number;
  totalTime: number;
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const centi = Math.floor((ms % 1000) / 10);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(centi).padStart(2, "0")}`;
}

export default function StopwatchTool() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startRef = useRef(0);
  const offsetRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now() - offsetRef.current;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 10);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleStartStop = () => {
    if (running) {
      offsetRef.current = elapsed;
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    offsetRef.current = 0;
    setLaps([]);
  };

  const handleLap = () => {
    const prevTotal = laps.length > 0 ? laps[0].totalTime : 0;
    setLaps((prev) => [
      { id: prev.length + 1, lapTime: elapsed - prevTotal, totalTime: elapsed },
      ...prev,
    ]);
  };

  const bestLap = laps.length > 0 ? Math.min(...laps.map((l) => l.lapTime)) : null;
  const worstLap = laps.length > 0 ? Math.max(...laps.map((l) => l.lapTime)) : null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-5xl font-bold tabular-nums text-gray-900">{formatMs(elapsed)}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <ToolButton onClick={handleStartStop}>{running ? "Stop" : "Start"}</ToolButton>
        <ToolButton onClick={handleLap} variant="secondary" disabled={!running && elapsed === 0}>Lap</ToolButton>
        <ToolButton onClick={handleReset} variant="secondary">Reset</ToolButton>
      </div>

      {laps.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Laps" value={laps.length} />
          <StatCard label="Best Lap" value={bestLap !== null ? formatMs(bestLap) : "—"} />
          <StatCard label="Worst Lap" value={worstLap !== null ? formatMs(worstLap) : "—"} />
        </div>
      )}

      {laps.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-700">Lap</th>
                <th className="px-3 py-2 text-right font-medium text-gray-700">Lap Time</th>
                <th className="px-3 py-2 text-right font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {laps.map((lap) => (
                <tr key={lap.id} className="border-t border-gray-100">
                  <td className="px-3 py-2 text-gray-600">{lap.id}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-gray-900">{formatMs(lap.lapTime)}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-gray-500">{formatMs(lap.totalTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
