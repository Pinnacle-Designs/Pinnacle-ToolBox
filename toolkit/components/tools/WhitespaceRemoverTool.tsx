"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, ToolButton, OutputBox } from "@/components/tools/ui";

type WhitespaceOp =
  | "trim-lines"
  | "collapse-spaces"
  | "remove-all"
  | "tabs-to-spaces"
  | "remove-empty-lines"
  | "trim-all";

function applyWhitespaceOp(text: string, op: WhitespaceOp): string {
  switch (op) {
    case "trim-lines":
      return text
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    case "collapse-spaces":
      return text.replace(/[^\S\n]+/g, " ");
    case "remove-all":
      return text.replace(/\s+/g, "");
    case "tabs-to-spaces":
      return text.replace(/\t/g, "    ");
    case "remove-empty-lines":
      return text
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .join("\n");
    case "trim-all":
      return text.trim();
    default:
      return text;
  }
}

const OPERATIONS: { id: WhitespaceOp; label: string; description: string }[] = [
  { id: "trim-lines", label: "Trim each line", description: "Remove leading/trailing spaces on every line" },
  { id: "collapse-spaces", label: "Collapse spaces", description: "Replace multiple spaces with a single space" },
  { id: "remove-all", label: "Remove all whitespace", description: "Strip every space, tab, and newline" },
  { id: "tabs-to-spaces", label: "Tabs to spaces", description: "Convert tabs to 4 spaces" },
  { id: "remove-empty-lines", label: "Remove empty lines", description: "Delete blank lines" },
  { id: "trim-all", label: "Trim entire text", description: "Remove leading/trailing whitespace" },
];

export default function WhitespaceRemoverTool() {
  const [input, setInput] = useState("");
  const [activeOp, setActiveOp] = useState<WhitespaceOp | null>(null);

  const output = useMemo(
    () => (activeOp ? applyWhitespaceOp(input, activeOp) : input),
    [input, activeOp]
  );

  return (
    <div className="space-y-6">
      <ToolTextarea
        label="Input text"
        value={input}
        onChange={setInput}
        rows={8}
        placeholder="Paste text with extra whitespace…"
      />

      <div className="grid gap-2 sm:grid-cols-2">
        {OPERATIONS.map((op) => (
          <button
            key={op.id}
            type="button"
            onClick={() => setActiveOp(op.id)}
            className={`rounded-lg border px-4 py-3 text-left transition ${
              activeOp === op.id
                ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="block text-sm font-medium text-gray-900">{op.label}</span>
            <span className="mt-0.5 block text-xs text-gray-500">{op.description}</span>
          </button>
        ))}
      </div>

      <OutputBox label="Output" value={activeOp ? output : ""} />

      <div className="flex flex-wrap gap-2">
        <CopyButton text={output} />
        <ToolButton variant="secondary" onClick={() => { setInput(""); setActiveOp(null); }}>
          Clear
        </ToolButton>
        <ToolButton
          onClick={() => setInput(output)}
          disabled={!activeOp || !output || output === input}
        >
          Apply to input
        </ToolButton>
      </div>
    </div>
  );
}
