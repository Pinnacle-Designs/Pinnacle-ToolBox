"use client";

import { useMemo, useState } from "react";
import { ToolTextarea, ToolButton, OutputBox, StatCard } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { minifyHtml, formatBytes } from "@/lib/utils";

export default function HtmlMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const stats = useMemo(() => {
    if (!input || !output) return null;
    const original = new Blob([input]).size;
    const minified = new Blob([output]).size;
    const saved = original > 0 ? Math.round(((original - minified) / original) * 100) : 0;
    return { original, minified, saved };
  }, [input, output]);

  const handleMinify = () => {
    setOutput(minifyHtml(input));
  };

  return (
    <div className="space-y-4">
      <ToolTextarea
        label="HTML Input"
        value={input}
        onChange={setInput}
        rows={12}
        placeholder="<div class='container'><p>Hello</p></div>"
      />

      <div className="flex flex-wrap gap-2">
        <ToolButton onClick={handleMinify} disabled={!input}>Minify HTML</ToolButton>
        {output && <CopyButton text={output} />}
      </div>

      {stats && (
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Original Size" value={formatBytes(stats.original)} />
          <StatCard label="Minified Size" value={formatBytes(stats.minified)} />
          <StatCard label="Saved" value={`${stats.saved}%`} />
        </div>
      )}

      {output && <OutputBox label="Minified HTML" value={output} />}
    </div>
  );
}
