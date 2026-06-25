"use client";

import { useState } from "react";
import { ToolTextarea, ToolButton, OutputBox } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { cn, downloadText, jsonToCsv } from "@/lib/utils";

export default function JsonToCsvTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState(false);

  const convert = () => {
    setError(null);
    setValid(false);
    if (!input.trim()) {
      setError("Paste a JSON array to convert.");
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input) as unknown;
      if (!Array.isArray(parsed)) {
        setError("Input must be a JSON array of objects.");
        setOutput("");
        return;
      }
      if (parsed.length === 0) {
        setError("Array is empty.");
        setOutput("");
        return;
      }
      if (!parsed.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) {
        setError("Each array item must be a plain object.");
        setOutput("");
        return;
      }
      const csv = jsonToCsv(parsed as Record<string, unknown>[]);
      setOutput(csv);
      setValid(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validate = () => {
    setError(null);
    setValid(false);
    try {
      const parsed = JSON.parse(input) as unknown;
      if (!Array.isArray(parsed)) {
        setError("Must be a JSON array.");
        return;
      }
      if (!parsed.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) {
        setError("Each item must be a plain object.");
        return;
      }
      setValid(true);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const downloadCsv = () => {
    if (output) downloadText(output, "data.csv", "text/csv");
  };

  return (
    <div className="space-y-4">
      <ToolTextarea
        label="JSON Array Input"
        value={input}
        onChange={setInput}
        rows={10}
        placeholder={'[\n  {"name": "Alice", "email": "alice@example.com"},\n  {"name": "Bob", "email": "bob@example.com"}\n]'}
      />

      <div className="flex flex-wrap gap-2">
        <ToolButton onClick={convert}>Convert to CSV</ToolButton>
        <ToolButton onClick={validate} variant="secondary">Validate</ToolButton>
        {output && (
          <>
            <CopyButton text={output} />
            <ToolButton onClick={downloadCsv} variant="secondary">Download CSV</ToolButton>
          </>
        )}
      </div>

      {valid && !error && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Valid JSON array</p>
      )}

      {error && <p className={cn("rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700")}>{error}</p>}

      {output && <OutputBox label="CSV Output" value={output} />}
    </div>
  );
}
