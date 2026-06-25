"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ToolInput, ToolButton, StatCard } from "@/components/tools/ui";
import { cn } from "@/lib/utils";

type Phase = "work" | "shortBreak" | "longBreak";

const PHASE_LABELS: Record<Phase, string> = {
  work: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    /* audio unavailable */
  }
}

export default function PomodoroTimerTool() {
  const [workMin, setWorkMin] = useState(25);
  const [shortBreakMin, setShortBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(15);
  const [sessionsBeforeLong, setSessionsBeforeLong] = useState(4);
  const [phase, setPhase] = useState<Phase>("work");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getDuration = useCallback((p: Phase) => {
    if (p === "work") return workMin * 60;
    if (p === "shortBreak") return shortBreakMin * 60;
    return longBreakMin * 60;
  }, [workMin, shortBreakMin, longBreakMin]);

  const resetPhase = useCallback((p: Phase) => {
    setPhase(p);
    setSecondsLeft(getDuration(p));
    setRunning(false);
  }, [getDuration]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          playBeep();
          setRunning(false);
          if (phase === "work") {
            const next = (completedSessions + 1) % sessionsBeforeLong === 0 ? "longBreak" : "shortBreak";
            setCompletedSessions((c) => c + 1);
            setPhase(next);
            return getDuration(next);
          }
          setPhase("work");
          return getDuration("work");
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phase, completedSessions, sessionsBeforeLong, getDuration]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress = 1 - secondsLeft / getDuration(phase);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ToolInput label="Work (min)" value={workMin} onChange={(v) => setWorkMin(Number(v) || 1)} type="number" min={1} max={120} />
        <ToolInput label="Short Break (min)" value={shortBreakMin} onChange={(v) => setShortBreakMin(Number(v) || 1)} type="number" min={1} max={60} />
        <ToolInput label="Long Break (min)" value={longBreakMin} onChange={(v) => setLongBreakMin(Number(v) || 1)} type="number" min={1} max={60} />
        <ToolInput label="Sessions before long break" value={sessionsBeforeLong} onChange={(v) => setSessionsBeforeLong(Number(v) || 1)} type="number" min={2} max={10} />
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className={cn(
          "rounded-full px-4 py-1 text-sm font-medium",
          phase === "work" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        )}>
          {PHASE_LABELS[phase]}
        </p>
        <div className="relative flex h-48 w-48 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"
              strokeDasharray={`${progress * 283} 283`}
              className="text-accent transition-all duration-1000"
            />
          </svg>
          <span className="text-4xl font-bold tabular-nums text-gray-900">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <ToolButton onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Start"}</ToolButton>
          <ToolButton onClick={() => resetPhase("work")} variant="secondary">Reset</ToolButton>
          <ToolButton onClick={() => resetPhase("shortBreak")} variant="secondary">Short Break</ToolButton>
          <ToolButton onClick={() => resetPhase("longBreak")} variant="secondary">Long Break</ToolButton>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Completed Sessions" value={completedSessions} />
        <StatCard label="Current Cycle" value={`${(completedSessions % sessionsBeforeLong) + 1} / ${sessionsBeforeLong}`} />
      </div>
    </div>
  );
}
