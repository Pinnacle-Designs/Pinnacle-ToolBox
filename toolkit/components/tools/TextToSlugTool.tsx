"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, ToolSelect, ToolCheckbox } from "@/components/tools/ui";
import { slugify } from "@/lib/utils";

const SEPARATOR_OPTIONS = [
  { value: "-", label: "Hyphen (-)" },
  { value: "_", label: "Underscore (_)" },
  { value: ".", label: "Dot (.)" },
];

export default function TextToSlugTool() {
  const [text, setText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);

  const slug = useMemo(
    () => (text.trim() ? slugify(text, separator, lowercase) : ""),
    [text, separator, lowercase]
  );

  return (
    <div className="space-y-6">
      <ToolTextarea
        label="Input text"
        value={text}
        onChange={setText}
        rows={4}
        placeholder="Enter a title or phrase…"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolSelect
          label="Separator"
          value={separator}
          onChange={setSeparator}
          options={SEPARATOR_OPTIONS}
        />
        <div className="flex items-end pb-1">
          <ToolCheckbox
            label="Lowercase"
            checked={lowercase}
            onChange={setLowercase}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={slug}
            placeholder="your-slug-here"
            className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm"
          />
          <CopyButton text={slug} />
        </div>
      </div>
    </div>
  );
}
