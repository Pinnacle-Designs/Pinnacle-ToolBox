"use client";

import { useState } from "react";
import { ToolTextarea, ToolButton, OutputBox } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { cn } from "@/lib/utils";

type Tab = "encode" | "decode";

const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function encodeHtmlEntities(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => ENTITY_MAP[ch] ?? ch);
}

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export default function HtmlEntityEncoderTool() {
  const [tab, setTab] = useState<Tab>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const process = () => {
    if (tab === "encode") {
      setOutput(encodeHtmlEntities(input));
    } else {
      setOutput(decodeHtmlEntities(input));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-gray-200">
        {(["encode", "decode"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setOutput(""); }}
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
        label={tab === "encode" ? "HTML / Text to Encode" : "HTML Entities to Decode"}
        value={input}
        onChange={setInput}
        rows={8}
        placeholder={tab === "encode" ? '<div class="test">& "quotes"' : "&lt;div class=&quot;test&quot;&gt;"}
      />

      <div className="flex flex-wrap gap-2">
        <ToolButton onClick={process}>{tab === "encode" ? "Encode" : "Decode"}</ToolButton>
        {output && <CopyButton text={output} />}
      </div>

      {output && <OutputBox label="Output" value={output} />}
    </div>
  );
}
