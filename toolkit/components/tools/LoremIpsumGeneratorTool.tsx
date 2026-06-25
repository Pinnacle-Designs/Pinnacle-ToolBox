"use client";

import { useCallback, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, ToolInput, ToolSelect, ToolButton } from "@/components/tools/ui";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(): string {
  const length = 8 + Math.floor(Math.random() * 8);
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(randomWord());
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const count = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, generateSentence).join(" ");
}

function generateLorem(type: "paragraphs" | "sentences" | "words", count: number): string {
  if (count <= 0) return "";

  if (type === "words") {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      words.push(randomWord());
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  }

  if (type === "sentences") {
    return Array.from({ length: count }, generateSentence).join(" ");
  }

  return Array.from({ length: count }, generateParagraph).join("\n\n");
}

export default function LoremIpsumGeneratorTool() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const handleGenerate = useCallback(() => {
    const num = Math.max(1, Math.min(100, Number(count) || 1));
    setOutput(generateLorem(type, num));
  }, [type, count]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolSelect
          label="Generate"
          value={type}
          onChange={(v) => setType(v as "paragraphs" | "sentences" | "words")}
          options={[
            { value: "paragraphs", label: "Paragraphs" },
            { value: "sentences", label: "Sentences" },
            { value: "words", label: "Words" },
          ]}
        />
        <ToolInput
          label="Count"
          type="number"
          value={count}
          min={1}
          max={100}
          onChange={(v) => setCount(Number(v))}
        />
      </div>

      <ToolButton onClick={handleGenerate}>Generate</ToolButton>

      <ToolTextarea
        label="Output"
        value={output}
        onChange={setOutput}
        rows={12}
        placeholder="Click Generate to create lorem ipsum text…"
      />

      <CopyButton text={output} />
    </div>
  );
}
