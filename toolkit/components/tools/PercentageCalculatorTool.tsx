"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import CopyButton from "@/components/CopyButton";
import { ToolInput, StatCard } from "@/components/tools/ui";

type Mode = "of" | "what-percent" | "percent-of-what";

const MODES: { id: Mode; label: string; formula: string; description: string }[] = [
  {
    id: "of",
    label: "X% of Y",
    formula: "Result = (X ÷ 100) × Y",
    description: "Find what percentage X of a number Y equals.",
  },
  {
    id: "what-percent",
    label: "X is what % of Y",
    formula: "Result = (X ÷ Y) × 100",
    description: "Find what percentage one number is of another.",
  },
  {
    id: "percent-of-what",
    label: "X is Y% of what",
    formula: "Result = X ÷ (Y ÷ 100)",
    description: "Find the whole when you know a part and its percentage.",
  },
];

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toPrecision(10)).toLocaleString("en-US", { maximumFractionDigits: 6 });
}

export default function PercentageCalculatorTool() {
  const [mode, setMode] = useState<Mode>("of");
  const [x, setX] = useState("15");
  const [y, setY] = useState("200");

  const active = MODES.find((m) => m.id === mode)!;

  const result = useMemo(() => {
    const numX = parseFloat(x);
    const numY = parseFloat(y);
    if (Number.isNaN(numX) || Number.isNaN(numY)) return null;

    switch (mode) {
      case "of":
        return (numX / 100) * numY;
      case "what-percent":
        if (numY === 0) return null;
        return (numX / numY) * 100;
      case "percent-of-what":
        if (numY === 0) return null;
        return numX / (numY / 100);
      default:
        return null;
    }
  }, [mode, x, y]);

  const resultLabel = useMemo(() => {
    if (result === null) return "";
    const fx = formatNum(result);
    switch (mode) {
      case "of":
        return `${x}% of ${y} = ${fx}`;
      case "what-percent":
        return `${x} is ${fx}% of ${y}`;
      case "percent-of-what":
        return `${x} is ${y}% of ${fx}`;
      default:
        return fx;
    }
  }, [mode, x, y, result]);

  const xLabel = mode === "percent-of-what" ? "Part (X)" : mode === "of" ? "Percentage (X)" : "Value (X)";
  const yLabel = mode === "of" ? "Number (Y)" : mode === "what-percent" ? "Total (Y)" : "Percentage (Y)";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition",
              mode === m.id
                ? "bg-accent text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">Formula</p>
        <p className="mt-1 font-mono text-sm text-blue-800">{active.formula}</p>
        <p className="mt-2 text-sm text-blue-700">{active.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolInput label={xLabel} type="number" value={x} onChange={setX} step={0.01} />
        <ToolInput label={yLabel} type="number" value={y} onChange={setY} step={0.01} />
      </div>

      {result !== null && (
        <>
          <StatCard label="Result" value={formatNum(result)} />
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-700">{resultLabel}</p>
            <CopyButton text={resultLabel} />
          </div>
        </>
      )}

      {result === null && (x !== "" || y !== "") && (
        <p className="text-sm text-red-600">Enter valid numbers. Division by zero is not allowed.</p>
      )}
    </div>
  );
}
