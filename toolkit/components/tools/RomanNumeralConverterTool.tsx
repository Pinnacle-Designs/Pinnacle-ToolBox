"use client";

import { useMemo, useState } from "react";
import { cn, intToRoman, romanToInt } from "@/lib/utils";
import CopyButton from "@/components/CopyButton";
import { ToolInput, OutputBox } from "@/components/tools/ui";

type Tab = "to-roman" | "to-int";

export default function RomanNumeralConverterTool() {
  const [tab, setTab] = useState<Tab>("to-roman");
  const [integer, setInteger] = useState("2024");
  const [roman, setRoman] = useState("MMXXIV");

  const toRomanResult = useMemo(() => {
    const num = parseInt(integer, 10);
    if (integer.trim() === "" || Number.isNaN(num)) return { error: "Enter a valid integer", value: "" };
    if (num < 1 || num > 3999) return { error: "Number must be between 1 and 3999", value: "" };
    return { error: "", value: intToRoman(num) };
  }, [integer]);

  const toIntResult = useMemo(() => {
    const trimmed = roman.trim();
    if (!trimmed) return { error: "Enter a Roman numeral", value: "" };
    const result = romanToInt(trimmed);
    if (result === null) return { error: "Invalid Roman numeral (use I, V, X, L, C, D, M only, range 1–3999)", value: "" };
    return { error: "", value: result.toString() };
  }, [roman]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("to-roman")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition",
            tab === "to-roman" ? "bg-accent text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          Integer → Roman
        </button>
        <button
          type="button"
          onClick={() => setTab("to-int")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition",
            tab === "to-int" ? "bg-accent text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          Roman → Integer
        </button>
      </div>

      {tab === "to-roman" ? (
        <>
          <ToolInput label="Integer (1–3999)" type="number" value={integer} onChange={setInteger} min={1} max={3999} step={1} />
          {toRomanResult.error ? (
            <p className="text-sm text-red-600">{toRomanResult.error}</p>
          ) : (
            <div className="space-y-3">
              <OutputBox label="Roman numeral" value={toRomanResult.value} />
              <CopyButton text={toRomanResult.value} />
            </div>
          )}
        </>
      ) : (
        <>
          <ToolInput label="Roman numeral" value={roman} onChange={setRoman} />
          <p className="text-xs text-gray-500">Valid symbols: I, V, X, L, C, D, M (classic subtractive notation)</p>
          {toIntResult.error ? (
            <p className="text-sm text-red-600">{toIntResult.error}</p>
          ) : (
            <div className="space-y-3">
              <OutputBox label="Integer" value={toIntResult.value} />
              <CopyButton text={toIntResult.value} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
