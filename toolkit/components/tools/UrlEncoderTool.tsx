"use client";

import { useState } from "react";
import { ToolTextarea, ToolButton, OutputBox } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { cn } from "@/lib/utils";

type Tab = "encode" | "decode";

export default function UrlEncoderTool() {
  const [tab, setTab] = useState<Tab>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const process = () => {
    setError(null);
    try {
      if (tab === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input.replace(/\+/g, " ")));
      }
    } catch {
      setError("Invalid URL-encoded string");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-gray-200">
        {(["encode", "decode"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setOutput(""); setError(null); }}
            className={cn(
              "px-4 py-2 text-sm font-medium capitalize transition",
              tab === t
                ? "border-b-2 border-accent text-accent"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <ToolTextarea
        label={tab === "encode" ? "Text to Encode" : "URL-Encoded Text"}
        value={input}
        onChange={setInput}
        rows={8}
        placeholder={tab === "encode" ? "Hello World & more" : "Hello%20World%20%26%20more"}
      />

      <div className="flex flex-wrap gap-2">
        <ToolButton onClick={process}>{tab === "encode" ? "Encode" : "Decode"}</ToolButton>
        {output && <CopyButton text={output} />}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {output && <OutputBox label="Output" value={output} />}
    </div>
  );
}
