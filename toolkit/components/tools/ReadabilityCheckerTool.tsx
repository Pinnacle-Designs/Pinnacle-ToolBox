"use client";

import { useMemo, useState } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ui";
import {
  countWords,
  countSentences,
  fleschReadingEase,
  fleschKincaidGrade,
  readabilityLabel,
  cn,
} from "@/lib/utils";

function gradeDescription(grade: number): string {
  if (grade <= 6) return "Elementary school";
  if (grade <= 8) return "Middle school";
  if (grade <= 12) return "High school";
  if (grade <= 16) return "College level";
  return "Graduate level";
}

const LABEL_COLORS = {
  Easy: "text-green-700 bg-green-50 border-green-200",
  Standard: "text-yellow-700 bg-yellow-50 border-yellow-200",
  Difficult: "text-red-700 bg-red-50 border-red-200",
};

export default function ReadabilityCheckerTool() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const words = countWords(text);
    const sentences = countSentences(text);
    const flesch = fleschReadingEase(text);
    const grade = fleschKincaidGrade(text);
    const label = readabilityLabel(flesch);

    return { words, sentences, flesch, grade, label };
  }, [text]);

  const hasText = text.trim().length > 0;

  return (
    <div className="space-y-6">
      <ToolTextarea
        label="Your text"
        value={text}
        onChange={setText}
        rows={10}
        placeholder="Paste text to analyze readability…"
      />

      {hasText ? (
        <>
          <div
            className={cn(
              "rounded-lg border px-4 py-3 text-center",
              LABEL_COLORS[analysis.label]
            )}
          >
            <p className="text-lg font-semibold">{analysis.label} to read</p>
            <p className="mt-1 text-sm opacity-80">
              Flesch Reading Ease: {analysis.flesch.toFixed(1)} · Grade level:{" "}
              {analysis.grade.toFixed(1)} ({gradeDescription(analysis.grade)})
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Flesch score" value={analysis.flesch.toFixed(1)} />
            <StatCard label="Grade level" value={analysis.grade.toFixed(1)} />
            <StatCard label="Words" value={analysis.words} />
            <StatCard label="Sentences" value={analysis.sentences} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-medium text-gray-700">Score guide</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>90–100: Very easy (5th grade)</li>
              <li>60–70: Standard (8th–9th grade)</li>
              <li>30–50: Difficult (college level)</li>
              <li>0–30: Very difficult (college graduate)</li>
            </ul>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">
          Enter at least a few sentences to see readability scores.
        </p>
      )}
    </div>
  );
}
