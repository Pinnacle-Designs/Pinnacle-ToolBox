"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, ToolButton } from "@/components/tools/ui";
import {
  toTitleCase,
  toSentenceCase,
  toAlternatingCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
} from "@/lib/utils";

const CASE_ACTIONS = [
  { label: "UPPERCASE", fn: (t: string) => t.toUpperCase() },
  { label: "lowercase", fn: (t: string) => t.toLowerCase() },
  { label: "Title Case", fn: toTitleCase },
  { label: "Sentence case", fn: toSentenceCase },
  { label: "camelCase", fn: toCamelCase },
  { label: "snake_case", fn: toSnakeCase },
  { label: "kebab-case", fn: toKebabCase },
  { label: "aLtErNaTiNg", fn: toAlternatingCase },
  {
    label: "InVeRsE cAsE",
    fn: (t: string) =>
      t
        .split("")
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
  },
] as const;

export default function CaseConverterTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-6">
      <ToolTextarea
        label="Input text"
        value={text}
        onChange={setText}
        rows={8}
        placeholder="Enter text to convert…"
      />

      <div className="flex flex-wrap gap-2">
        {CASE_ACTIONS.map(({ label, fn }) => (
          <ToolButton
            key={label}
            variant="secondary"
            disabled={!text}
            onClick={() => setText(fn(text))}
          >
            {label}
          </ToolButton>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <CopyButton text={text} />
      </div>
    </div>
  );
}
