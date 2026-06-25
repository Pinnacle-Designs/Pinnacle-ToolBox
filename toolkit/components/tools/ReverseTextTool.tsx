"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, ToolSelect } from "@/components/tools/ui";

type ReverseMode = "characters" | "words" | "lines";

function reverseText(text: string, mode: ReverseMode): string {
  switch (mode) {
    case "characters":
      return text.split("").reverse().join("");
    case "words":
      return text
        .split(/(\s+)/)
        .reverse()
        .join("");
    case "lines":
      return text.split("\n").reverse().join("\n");
    default:
      return text;
  }
}

const MODE_OPTIONS = [
  { value: "characters", label: "Reverse characters" },
  { value: "words", label: "Reverse word order" },
  { value: "lines", label: "Reverse line order" },
];

export default function ReverseTextTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ReverseMode>("characters");

  const output = useMemo(() => reverseText(input, mode), [input, mode]);

  return (
    <div className="space-y-6">
      <ToolSelect
        label="Reverse mode"
        value={mode}
        onChange={(v) => setMode(v as ReverseMode)}
        options={MODE_OPTIONS}
      />

      <ToolTextarea
        label="Input text"
        value={input}
        onChange={setInput}
        rows={6}
        placeholder="Enter text to reverse…"
      />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Reversed output</label>
        <textarea
          readOnly
          value={output}
          rows={6}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm"
          placeholder="Reversed text appears here…"
        />
      </div>

      <CopyButton text={output} />
    </div>
  );
}
