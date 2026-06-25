"use client";

import { useState, useCallback } from "react";
import { ToolTextarea, ToolButton, OutputBox } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { cn } from "@/lib/utils";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");

  const parseJson = useCallback((text: string) => {
    try {
      return JSON.parse(text) as unknown;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, []);

  const handleFormat = () => {
    try {
      const parsed = parseJson(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
      setStatus("valid");
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setStatus("invalid");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = parseJson(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
      setStatus("valid");
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setStatus("invalid");
    }
  };

  const handleValidate = () => {
    try {
      parseJson(input);
      setOutput("Valid JSON");
      setError(null);
      setStatus("valid");
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setStatus("invalid");
    }
  };

  return (
    <div className="space-y-4">
      <ToolTextarea
        label="JSON Input"
        value={input}
        onChange={setInput}
        rows={12}
        placeholder='{"key": "value"}'
      />

      <div className="flex flex-wrap gap-2">
        <ToolButton onClick={handleFormat}>Format</ToolButton>
        <ToolButton onClick={handleMinify} variant="secondary">Minify</ToolButton>
        <ToolButton onClick={handleValidate} variant="secondary">Validate</ToolButton>
        {output && <CopyButton text={output} label="Copy Output" />}
      </div>

      {status === "valid" && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Valid JSON</p>
      )}

      {error && (
        <p className={cn("rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700")}>{error}</p>
      )}

      {output && status !== "invalid" && (
        <OutputBox label="Output" value={output} />
      )}
    </div>
  );
}
