"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolInput, ToolSelect, ToolCheckbox, OutputBox } from "@/components/tools/ui";

const ONES = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALES = ["", "thousand", "million", "billion"];
const ORDINAL_ONES = [
  "", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth",
  "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth",
];
const ORDINAL_TENS = ["", "", "twentieth", "thirtieth", "fortieth", "fiftieth", "sixtieth", "seventieth", "eightieth", "ninetieth"];

function chunkToWords(chunk: number, style: "us" | "uk", useAnd: boolean): string {
  const parts: string[] = [];
  const h = Math.floor(chunk / 100);
  const t = chunk % 100;

  if (h > 0) {
    parts.push(`${ONES[h]} hundred`);
    if (useAnd && t > 0) parts.push("and");
  }

  if (t > 0) {
    if (t < 20) parts.push(ONES[t]);
    else {
      const tens = TENS[Math.floor(t / 10)];
      const ones = t % 10 ? `-${ONES[t % 10]}` : "";
      parts.push(`${tens}${ones}`);
    }
  }

  return parts.join(" ").trim();
}

function numberToWords(n: number, style: "us" | "uk", useAnd: boolean): string {
  if (n === 0) return "zero";
  if (n < 0) return `negative ${numberToWords(-n, style, useAnd)}`;
  if (n >= 1e12) return n.toString();

  const parts: string[] = [];
  let num = Math.floor(n);
  let scale = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      let chunkStr = chunkToWords(chunk, style, useAnd);
      if (SCALES[scale]) chunkStr += ` ${SCALES[scale]}`;
      parts.unshift(chunkStr);
    }
    num = Math.floor(num / 1000);
    scale++;
  }

  let result = parts.join(" ");
  if (useAnd && style === "us") {
    result = result.replace(/\bhundred (\w)/, "hundred and $1");
  }
  return result;
}

function toOrdinal(n: number, style: "us" | "uk", useAnd: boolean): string {
  if (n === 0) return "zeroth";
  if (n < 0) return `negative ${toOrdinal(-n, style, useAnd)}`;
  if (n <= 19) return ORDINAL_ONES[n];

  const lastTwo = n % 100;
  const lastOne = n % 10;

  if (lastTwo >= 11 && lastTwo <= 13) {
    return `${numberToWords(n, style, useAnd)}th`;
  }

  if (lastOne === 0) {
    if (n < 100) return ORDINAL_TENS[Math.floor(n / 10)];
    const w = numberToWords(n, style, useAnd);
    if (w.endsWith("ty")) return `${w.slice(0, -2)}tieth`;
    if (w.endsWith("y")) return `${w.slice(0, -1)}ieth`;
    return `${w}th`;
  }

  if (n < 100) {
    return `${TENS[Math.floor(n / 10)]}-${ORDINAL_ONES[lastOne]}`;
  }

  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;
  let hPart = `${ONES[hundreds]} hundred`;
  if (useAnd && remainder > 0) hPart += style === "uk" ? " and" : " and";

  if (remainder === 0) return `${hPart}th`;
  if (remainder < 20) return `${hPart} ${ORDINAL_ONES[remainder]}`;
  return `${hPart} ${TENS[Math.floor(remainder / 10)]}-${ORDINAL_ONES[remainder % 10]}`;
}

export default function NumberToWordsTool() {
  const [value, setValue] = useState("1234");
  const [style, setStyle] = useState<"us" | "uk">("us");
  const [ordinal, setOrdinal] = useState(false);
  const [useAnd, setUseAnd] = useState(true);

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (value.trim() === "" || Number.isNaN(num)) return { error: "Enter a valid number", text: "" };
    if (!Number.isInteger(num)) return { error: "Only whole numbers are supported", text: "" };
    if (Math.abs(num) >= 1e12) return { error: "Number too large (max 999,999,999,999)", text: "" };

    const abs = Math.abs(num);
    const text = ordinal ? toOrdinal(abs, style, useAnd) : numberToWords(abs, style, useAnd);

    return {
      error: "",
      text: num < 0 ? `negative ${text}` : text,
    };
  }, [value, style, ordinal, useAnd]);

  return (
    <div className="space-y-6">
      <ToolInput label="Number" type="number" value={value} onChange={setValue} step={1} />

      <ToolSelect
        label="Style"
        value={style}
        onChange={(v) => setStyle(v as "us" | "uk")}
        options={[
          { value: "us", label: "US English" },
          { value: "uk", label: "UK English" },
        ]}
      />

      <div className="flex flex-wrap gap-4">
        <ToolCheckbox label="Ordinal (1st, 2nd, 3rd…)" checked={ordinal} onChange={setOrdinal} />
        <ToolCheckbox
          label='Include "and" (e.g. one hundred and twenty-three)'
          checked={useAnd}
          onChange={setUseAnd}
        />
      </div>

      {result.error ? (
        <p className="text-sm text-red-600">{result.error}</p>
      ) : (
        <div className="space-y-3">
          <OutputBox label={ordinal ? "Ordinal" : "Words"} value={result.text} />
          <CopyButton text={result.text} />
        </div>
      )}
    </div>
  );
}
