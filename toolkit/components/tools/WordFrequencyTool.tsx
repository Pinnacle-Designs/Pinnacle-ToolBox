"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, ToolInput, ToolCheckbox, StatCard } from "@/components/tools/ui";
import { getWordFrequency, STOP_WORDS } from "@/lib/utils";
import { cn } from "@/lib/utils";

type SortKey = "word" | "count";
type SortDir = "asc" | "desc";

export default function WordFrequencyTool() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [excludeStopWords, setExcludeStopWords] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("count");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const rows = useMemo(() => {
    const freq = getWordFrequency(text);
    let entries = Array.from(freq.entries());

    if (excludeStopWords) {
      entries = entries.filter(([word]) => !STOP_WORDS.has(word));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      entries = entries.filter(([word]) => word.includes(q));
    }

    entries.sort((a, b) => {
      const cmp = sortKey === "word" ? a[0].localeCompare(b[0]) : a[1] - b[1];
      return sortDir === "asc" ? cmp : -cmp;
    });

    return entries;
  }, [text, excludeStopWords, search, sortKey, sortDir]);

  const copyText = useMemo(
    () => rows.map(([word, count]) => `${word}\t${count}`).join("\n"),
    [rows]
  );

  const totalWords = useMemo(() => rows.reduce((sum, [, c]) => sum + c, 0), [rows]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "count" ? "desc" : "asc");
    }
  }

  function sortIndicator(key: SortKey): string {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ↑" : " ↓";
  }

  return (
    <div className="space-y-6">
      <ToolTextarea
        label="Input text"
        value={text}
        onChange={setText}
        rows={8}
        placeholder="Paste text to analyze word frequency…"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolInput
          label="Search words"
          value={search}
          onChange={setSearch}
        />
        <div className="flex items-end pb-1">
          <ToolCheckbox
            label="Exclude stop words"
            checked={excludeStopWords}
            onChange={setExcludeStopWords}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Unique words" value={rows.length} />
          <StatCard label="Total occurrences" value={totalWords} />
        </div>
        <CopyButton text={copyText} label="Copy table" />
      </div>

      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">
                  <button
                    type="button"
                    onClick={() => toggleSort("word")}
                    className="font-medium text-gray-600 hover:text-gray-900"
                  >
                    Word{sortIndicator("word")}
                  </button>
                </th>
                <th className="px-4 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSort("count")}
                    className="font-medium text-gray-600 hover:text-gray-900"
                  >
                    Count{sortIndicator("count")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map(([word, count]) => (
                <tr key={word} className={cn(search && word.includes(search.toLowerCase()) && "bg-accent/5")}>
                  <td className="px-4 py-2 font-mono">{word}</td>
                  <td className="px-4 py-2 text-right text-gray-600">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        text.trim() && (
          <p className="text-sm text-gray-500">No words match your filters.</p>
        )
      )}
    </div>
  );
}
