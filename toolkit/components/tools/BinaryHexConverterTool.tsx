"use client";

import { useCallback, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolInput, OutputBox } from "@/components/tools/ui";

type Base = 2 | 8 | 10 | 16;

const BASE_LABELS: Record<Base, string> = {
  2: "Binary",
  8: "Octal",
  10: "Decimal",
  16: "Hexadecimal",
};

function isValidForBase(value: string, base: Base): boolean {
  if (!value.trim()) return true;
  const patterns: Record<Base, RegExp> = {
    2: /^-?[01]+$/,
    8: /^-?[0-7]+$/,
    10: /^-?\d+$/,
    16: /^-?[0-9A-Fa-f]+$/,
  };
  return patterns[base].test(value.trim());
}

function parseFromBase(value: string, base: Base): bigint | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!isValidForBase(trimmed, base)) return null;

  const negative = trimmed.startsWith("-");
  const abs = negative ? trimmed.slice(1) : trimmed;

  try {
    let result = BigInt(0);
    for (const char of abs) {
      const digit = parseInt(char, base);
      if (Number.isNaN(digit)) return null;
      result = result * BigInt(base) + BigInt(digit);
    }
    return negative ? -result : result;
  } catch {
    return null;
  }
}

function formatToBase(n: bigint, base: Base): string {
  if (n === BigInt(0)) return "0";
  const negative = n < BigInt(0);
  let abs = negative ? -n : n;
  const digits: string[] = [];
  while (abs > BigInt(0)) {
    const rem = Number(abs % BigInt(base));
    digits.unshift(rem.toString(base).toUpperCase());
    abs /= BigInt(base);
  }
  const result = digits.join("");
  return negative ? `-${result}` : result;
}

export default function BinaryHexConverterTool() {
  const [binary, setBinary] = useState("1010");
  const [octal, setOctal] = useState("12");
  const [decimal, setDecimal] = useState("10");
  const [hex, setHex] = useState("A");
  const [activeField, setActiveField] = useState<Base>(10);

  const updateAll = useCallback((source: Base, raw: string) => {
    const setters: Record<Base, (v: string) => void> = {
      2: setBinary,
      8: setOctal,
      10: setDecimal,
      16: setHex,
    };
    setters[source](raw);
    setActiveField(source);

    if (!raw.trim()) {
      if (source !== 2) setBinary("");
      if (source !== 8) setOctal("");
      if (source !== 10) setDecimal("");
      if (source !== 16) setHex("");
      return;
    }

    if (!isValidForBase(raw, source)) return;

    const parsed = parseFromBase(raw, source);
    if (parsed === null) return;

    if (source !== 2) setBinary(formatToBase(parsed, 2));
    if (source !== 8) setOctal(formatToBase(parsed, 8));
    if (source !== 10) setDecimal(formatToBase(parsed, 10));
    if (source !== 16) setHex(formatToBase(parsed, 16));
  }, []);

  const fields: { base: Base; value: string; setter: (v: string) => void }[] = [
    { base: 2, value: binary, setter: (v) => updateAll(2, v) },
    { base: 8, value: octal, setter: (v) => updateAll(8, v) },
    { base: 10, value: decimal, setter: (v) => updateAll(10, v) },
    { base: 16, value: hex, setter: (v) => updateAll(16, v) },
  ];

  const copyValue = fields.find((f) => f.base === activeField)?.value ?? decimal;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Edit any field — all bases update live. Supports integers only (negative values allowed).
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ base, value, setter }) => (
          <ToolInput
            key={base}
            label={BASE_LABELS[base]}
            value={value}
            onChange={setter}
          />
        ))}
      </div>

      {binary && !isValidForBase(binary, 2) && activeField === 2 && (
        <p className="text-sm text-red-600">Invalid binary — use 0 and 1 only.</p>
      )}
      {octal && !isValidForBase(octal, 8) && activeField === 8 && (
        <p className="text-sm text-red-600">Invalid octal — use digits 0–7 only.</p>
      )}
      {hex && !isValidForBase(hex, 16) && activeField === 16 && (
        <p className="text-sm text-red-600">Invalid hexadecimal — use 0–9 and A–F only.</p>
      )}

      {decimal && (
        <div className="space-y-3">
          <OutputBox
            label="Summary"
            value={`Binary: ${binary || "—"}\nOctal: ${octal || "—"}\nDecimal: ${decimal || "—"}\nHex: ${hex || "—"}`}
          />
          <CopyButton text={copyValue} label="Copy active value" />
        </div>
      )}
    </div>
  );
}
