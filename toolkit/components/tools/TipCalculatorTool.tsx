"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ToolInput, StatCard } from "@/components/tools/ui";

const QUICK_TIPS = [10, 15, 18, 20, 25];

export default function TipCalculatorTool() {
  const [bill, setBill] = useState("50");
  const [tipPercent, setTipPercent] = useState("18");
  const [people, setPeople] = useState("2");

  const result = useMemo(() => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const split = parseInt(people, 10);
    if (Number.isNaN(billAmount) || Number.isNaN(tip) || Number.isNaN(split)) return null;
    if (billAmount < 0 || tip < 0 || split < 1) return null;

    const tipAmount = (billAmount * tip) / 100;
    const total = billAmount + tipAmount;
    const perPerson = total / split;
    const tipPerPerson = tipAmount / split;

    return { tipAmount, total, perPerson, tipPerPerson };
  }, [bill, tipPercent, people]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-6">
      <ToolInput label="Bill amount ($)" type="number" value={bill} onChange={setBill} min={0} step={0.01} />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Tip percentage (%)</label>
        <div className="flex flex-wrap gap-2">
          {QUICK_TIPS.map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setTipPercent(String(pct))}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                tipPercent === String(pct)
                  ? "bg-accent text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              {pct}%
            </button>
          ))}
        </div>
        <input
          type="number"
          value={tipPercent}
          onChange={(e) => setTipPercent(e.target.value)}
          min={0}
          step={0.5}
          className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <ToolInput
        label="Split between (people)"
        type="number"
        value={people}
        onChange={setPeople}
        min={1}
        step={1}
      />

      {result === null && (bill !== "" || tipPercent !== "" || people !== "") && (
        <p className="text-sm text-red-600">Enter valid bill amount, tip %, and at least 1 person.</p>
      )}

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard label="Tip amount" value={fmt(result.tipAmount)} />
          <StatCard label="Total (bill + tip)" value={fmt(result.total)} />
          <StatCard label="Per person (total)" value={fmt(result.perPerson)} />
          <StatCard label="Tip per person" value={fmt(result.tipPerPerson)} />
        </div>
      )}
    </div>
  );
}
