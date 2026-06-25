"use client";

import { useCallback, useRef, useState } from "react";
import { ToolTextarea, ToolButton, ToolCheckbox, OutputBox } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { cn, downloadText, parseCsv } from "@/lib/utils";

export default function CsvToJsonTool() {
  const [input, setInput] = useState("");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      setError("Paste or upload CSV data to convert.");
      return;
    }
    try {
      const rows = parseCsv(input, hasHeaders);
      if (rows.length === 0) {
        setError("No data rows found.");
        setOutput("");
        return;
      }
      setOutput(JSON.stringify(rows, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse CSV");
      setOutput("");
    }
  }, [input, hasHeaders]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") setInput(text);
    };
    reader.readAsText(file);
  };

  const downloadJson = () => {
    if (output) downloadText(output, "data.json", "application/json");
  };

  return (
    <div className="space-y-4">
      <ToolCheckbox label="First row contains headers" checked={hasHeaders} onChange={setHasHeaders} />

      <ToolTextarea
        label="CSV Input"
        value={input}
        onChange={setInput}
        rows={10}
        placeholder={"name,email,age\nAlice,alice@example.com,30\nBob,bob@example.com,25"}
      />

      <div>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        <ToolButton variant="secondary" onClick={() => fileRef.current?.click()}>
          Upload CSV
        </ToolButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <ToolButton onClick={convert}>Convert to JSON</ToolButton>
        {output && (
          <>
            <CopyButton text={output} />
            <ToolButton onClick={downloadJson} variant="secondary">Download JSON</ToolButton>
          </>
        )}
      </div>

      {error && <p className={cn("rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700")}>{error}</p>}

      {output && <OutputBox label="JSON Output" value={output} />}
    </div>
  );
}
