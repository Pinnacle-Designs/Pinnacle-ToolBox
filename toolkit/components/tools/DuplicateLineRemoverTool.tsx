"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, ToolButton, ToolCheckbox, StatCard, OutputBox } from "@/components/tools/ui";

function removeDuplicateLines(text: string, caseSensitive: boolean): string {
  const lines = text.split("\n");
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(line);
    }
  }

  return result.join("\n");
}

export default function DuplicateLineRemoverTool() {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const output = useMemo(
    () => removeDuplicateLines(input, caseSensitive),
    [input, caseSensitive]
  );

  const removedCount = useMemo(() => {
    const inputLines = input ? input.split("\n").length : 0;
    const outputLines = output ? output.split("\n").length : 0;
    return inputLines - outputLines;
  }, [input, output]);

  return (
    <div className="space-y-6">
      <ToolTextarea
        label="Input text"
        value={input}
        onChange={setInput}
        rows={8}
        placeholder="Enter text with duplicate lines…"
      />

      <ToolCheckbox
        label="Case sensitive"
        checked={caseSensitive}
        onChange={setCaseSensitive}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Input lines" value={input ? input.split("\n").length : 0} />
        <StatCard label="Output lines" value={output ? output.split("\n").length : 0} />
        <StatCard label="Removed" value={removedCount} />
      </div>

      <OutputBox label="Output" value={output} />

      <div className="flex flex-wrap gap-2">
        <CopyButton text={output} />
        <ToolButton variant="secondary" onClick={() => setInput("")}>
          Clear
        </ToolButton>
        <ToolButton onClick={() => setInput(output)} disabled={!output}>
          Apply to input
        </ToolButton>
      </div>
    </div>
  );
}
