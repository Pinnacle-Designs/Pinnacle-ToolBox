"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import CopyButton from "@/components/CopyButton";
import { ToolInput, OutputBox, StatCard } from "@/components/tools/ui";

type Tab = "to-scientific" | "to-standard";

function toScientific(value: number): { coefficient: string; exponent: number; notation: string } | null {
  if (!Number.isFinite(value)) return null;
  if (value === 0) return { coefficient: "0", exponent: 0, notation: "0 × 10⁰" };

  const exp = Math.floor(Math.log10(Math.abs(value)));
  const coeff = value / Math.pow(10, exp);
  const coeffStr = parseFloat(coeff.toPrecision(10)).toString();
  const notation = `${coeffStr} × 10^${exp}`;

  return { coefficient: coeffStr, exponent: exp, notation };
}

function fromScientific(coefficient: string, exponent: string): { value: number; standard: string } | null {
  const c = parseFloat(coefficient);
  const e = parseInt(exponent, 10);
  if (Number.isNaN(c) || Number.isNaN(e)) return null;
  const value = c * Math.pow(10, e);
  if (!Number.isFinite(value)) return null;

  let standard: string;
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
    standard = value.toExponential(10);
  } else {
    standard = parseFloat(value.toPrecision(12)).toString();
  }

  return { value, standard };
}

function parseScientificString(input: string): { coefficient: string; exponent: string } | null {
  const trimmed = input.trim();
  const match = trimmed.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*(?:[×x\*]\s*10\s*\^?\s*([+-]?\d+)|[eE]([+-]?\d+))?$/);
  if (!match) return null;

  if (match[2] !== undefined) {
    return { coefficient: match[1], exponent: match[2] };
  }
  const num = parseFloat(match[1]);
  if (Number.isNaN(num)) return null;
  const sci = toScientific(num);
  if (!sci) return null;
  return { coefficient: sci.coefficient, exponent: String(sci.exponent) };
}

export default function ScientificNotationConverterTool() {
  const [tab, setTab] = useState<Tab>("to-scientific");
  const [standard, setStandard] = useState("1234567");
  const [coefficient, setCoefficient] = useState("1.234567");
  const [exponent, setExponent] = useState("6");
  const [scientificInput, setScientificInput] = useState("1.234567 × 10^6");

  const toSciResult = useMemo(() => {
    const num = parseFloat(standard);
    if (standard.trim() === "" || Number.isNaN(num)) return { error: "Enter a valid number", data: null };
    const sci = toScientific(num);
    if (!sci) return { error: "Cannot convert", data: null };
    return { error: "", data: sci };
  }, [standard]);

  const toStdResult = useMemo(() => {
    const parsed = fromScientific(coefficient, exponent);
    if (!parsed) return { error: "Enter valid coefficient and exponent", data: null };
    return { error: "", data: parsed };
  }, [coefficient, exponent]);

  const parseResult = useMemo(() => {
    const parts = parseScientificString(scientificInput);
    if (!parts) return { error: "Could not parse notation", data: null };
    const result = fromScientific(parts.coefficient, parts.exponent);
    if (!result) return { error: "Invalid values", data: null };
    return { error: "", data: result };
  }, [scientificInput]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("to-scientific")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition",
            tab === "to-scientific" ? "bg-accent text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          Standard → Scientific
        </button>
        <button
          type="button"
          onClick={() => setTab("to-standard")}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition",
            tab === "to-standard" ? "bg-accent text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          Scientific → Standard
        </button>
      </div>

      {tab === "to-scientific" ? (
        <>
          <ToolInput label="Standard notation" type="number" value={standard} onChange={setStandard} step={0.000001} />
          {toSciResult.error ? (
            <p className="text-sm text-red-600">{toSciResult.error}</p>
          ) : toSciResult.data && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <StatCard label="Coefficient" value={toSciResult.data.coefficient} />
                <StatCard label="Exponent" value={toSciResult.data.exponent} />
              </div>
              <OutputBox label="Scientific notation" value={toSciResult.data.notation} />
              <OutputBox
                label="E-notation"
                value={`${toSciResult.data.coefficient}e${toSciResult.data.exponent}`}
              />
              <CopyButton text={toSciResult.data.notation} />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <ToolInput label="Coefficient" type="number" value={coefficient} onChange={setCoefficient} step={0.000001} />
            <ToolInput label="Exponent" type="number" value={exponent} onChange={setExponent} step={1} />
          </div>
          <ToolInput
            label="Or paste scientific notation"
            value={scientificInput}
            onChange={setScientificInput}
          />
          <p className="text-xs text-gray-500">Examples: 1.23 × 10^6, 1.23e6, 1.23E+6</p>

          {toStdResult.error && coefficient && exponent ? (
            <p className="text-sm text-red-600">{toStdResult.error}</p>
          ) : toStdResult.data && (
            <div className="space-y-3">
              <OutputBox label="Standard notation" value={toStdResult.data.standard} />
              <CopyButton text={toStdResult.data.standard} />
            </div>
          )}

          {!toStdResult.error && parseResult.data && scientificInput.trim() && (
            <OutputBox label="Parsed from text" value={parseResult.data.standard} />
          )}
        </>
      )}
    </div>
  );
}
