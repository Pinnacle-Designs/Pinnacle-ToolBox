"use client";

import { useMemo, useState } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ui";
import {
  countWords,
  countSentences,
  countParagraphs,
  getWordFrequency,
} from "@/lib/utils";

const WORDS_PER_MINUTE = 200;

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = countWords(text);
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);
    const readingMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

    const freq = getWordFrequency(text);
    const topWords = Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return { words, chars, charsNoSpaces, sentences, paragraphs, readingMinutes, topWords };
  }, [text]);

  return (
    <div className="space-y-6">
      <ToolTextarea
        label="Your text"
        value={text}
        onChange={setText}
        rows={10}
        placeholder="Paste or type your text here…"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.chars} />
        <StatCard label="No spaces" value={stats.charsNoSpaces} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Reading time" value={`${stats.readingMinutes} min`} />
      </div>

      {stats.topWords.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">Top 10 words</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Word</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-600">Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.topWords.map(([word, count]) => (
                  <tr key={word}>
                    <td className="px-4 py-2 font-mono">{word}</td>
                    <td className="px-4 py-2 text-right text-gray-600">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
