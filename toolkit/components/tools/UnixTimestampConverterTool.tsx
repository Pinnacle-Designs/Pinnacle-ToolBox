"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolInput, ToolButton, ToolCheckbox, StatCard } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { cn } from "@/lib/utils";

type Mode = "toDate" | "toTimestamp";

export default function UnixTimestampConverterTool() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [mode, setMode] = useState<Mode>("toDate");
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [useMs, setUseMs] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const d = new Date();
    setDateInput(d.toISOString().slice(0, 16));
  }, []);

  const currentMs = now * 1000;
  const currentDisplay = useMs ? currentMs : now;

  const { converted, convertError } = useMemo(() => {
    if (mode === "toDate") {
      const raw = timestampInput.trim();
      if (!raw) return { converted: null, convertError: null };
      const num = Number(raw);
      if (isNaN(num)) return { converted: null, convertError: "Invalid timestamp" };
      const ms = useMs ? num : num * 1000;
      const date = new Date(ms);
      if (isNaN(date.getTime())) return { converted: null, convertError: "Invalid timestamp" };
      return {
        converted: {
          type: "date" as const,
          iso: date.toISOString(),
          local: date.toLocaleString(),
          utc: date.toUTCString(),
          relative: getRelative(date),
        },
        convertError: null,
      };
    }
    const raw = dateInput.trim();
    if (!raw) return { converted: null, convertError: null };
    const date = new Date(raw);
    if (isNaN(date.getTime())) return { converted: null, convertError: "Invalid date" };
    return {
      converted: {
        type: "timestamp" as const,
        seconds: Math.floor(date.getTime() / 1000),
        milliseconds: date.getTime(),
      },
      convertError: null,
    };
  }, [mode, timestampInput, dateInput, useMs]);

  const displayError = convertError;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Current Unix Timestamp (s)" value={now} />
        <StatCard label="Current Unix Timestamp (ms)" value={currentMs} />
      </div>
      <CopyButton text={String(currentDisplay)} label="Copy Current" />

      <div className="flex gap-2 border-b border-gray-200">
        {(["toDate", "toTimestamp"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition",
              mode === m ? "border-b-2 border-accent text-accent" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {m === "toDate" ? "Timestamp → Date" : "Date → Timestamp"}
          </button>
        ))}
      </div>

      <ToolCheckbox label="Use milliseconds" checked={useMs} onChange={setUseMs} />

      {mode === "toDate" ? (
        <ToolInput
          label={useMs ? "Timestamp (ms)" : "Timestamp (seconds)"}
          value={timestampInput}
          onChange={setTimestampInput}
        />
      ) : (
        <ToolInput
          label="Date & Time"
          value={dateInput}
          onChange={setDateInput}
          type="datetime-local"
        />
      )}

      <ToolButton
        variant="secondary"
        onClick={() => {
          if (mode === "toDate") setTimestampInput(String(currentDisplay));
          else setDateInput(new Date().toISOString().slice(0, 16));
        }}
      >
        Use Current {mode === "toDate" ? "Timestamp" : "Date"}
      </ToolButton>

      {displayError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{displayError}</p>}

      {converted?.type === "date" && (
        <div className="space-y-2 rounded-lg border border-gray-200 p-4">
          <p className="text-sm"><span className="font-medium text-gray-700">ISO 8601:</span> {converted.iso}</p>
          <p className="text-sm"><span className="font-medium text-gray-700">Local:</span> {converted.local}</p>
          <p className="text-sm"><span className="font-medium text-gray-700">UTC:</span> {converted.utc}</p>
          <p className="text-sm"><span className="font-medium text-gray-700">Relative:</span> {converted.relative}</p>
          <CopyButton text={converted.iso} />
        </div>
      )}

      {converted?.type === "timestamp" && (
        <div className="space-y-2 rounded-lg border border-gray-200 p-4">
          <p className="text-sm"><span className="font-medium text-gray-700">Seconds:</span> {converted.seconds}</p>
          <p className="text-sm"><span className="font-medium text-gray-700">Milliseconds:</span> {converted.milliseconds}</p>
          <CopyButton text={String(useMs ? converted.milliseconds : converted.seconds)} />
        </div>
      )}
    </div>
  );
}

function getRelative(date: Date): string {
  const diff = date.getTime() - Date.now();
  const abs = Math.abs(diff);
  const units: [number, string][] = [
    [86400000, "day"],
    [3600000, "hour"],
    [60000, "minute"],
    [1000, "second"],
  ];
  for (const [ms, unit] of units) {
    const val = Math.round(abs / ms);
    if (val >= 1) return diff < 0 ? `${val} ${unit}${val > 1 ? "s" : ""} ago` : `in ${val} ${unit}${val > 1 ? "s" : ""}`;
  }
  return "just now";
}
