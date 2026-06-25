"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ToolInput, ToolSelect, StatCard } from "@/components/tools/ui";

type Category = "length" | "weight" | "temperature" | "speed" | "area" | "volume" | "data" | "time";

type UnitDef = { value: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number };

const LINEAR = (factor: number): Pick<UnitDef, "toBase" | "fromBase"> => ({
  toBase: (v) => v * factor,
  fromBase: (v) => v / factor,
});

const CATEGORIES: Record<Category, { label: string; units: UnitDef[] }> = {
  length: {
    label: "Length",
    units: [
      { value: "m", label: "Meters (m)", ...LINEAR(1) },
      { value: "km", label: "Kilometers (km)", ...LINEAR(1000) },
      { value: "cm", label: "Centimeters (cm)", ...LINEAR(0.01) },
      { value: "mm", label: "Millimeters (mm)", ...LINEAR(0.001) },
      { value: "mi", label: "Miles (mi)", ...LINEAR(1609.344) },
      { value: "yd", label: "Yards (yd)", ...LINEAR(0.9144) },
      { value: "ft", label: "Feet (ft)", ...LINEAR(0.3048) },
      { value: "in", label: "Inches (in)", ...LINEAR(0.0254) },
    ],
  },
  weight: {
    label: "Weight",
    units: [
      { value: "kg", label: "Kilograms (kg)", ...LINEAR(1) },
      { value: "g", label: "Grams (g)", ...LINEAR(0.001) },
      { value: "mg", label: "Milligrams (mg)", ...LINEAR(0.000001) },
      { value: "lb", label: "Pounds (lb)", ...LINEAR(0.453592) },
      { value: "oz", label: "Ounces (oz)", ...LINEAR(0.0283495) },
      { value: "t", label: "Metric tons (t)", ...LINEAR(1000) },
      { value: "st", label: "Stone (st)", ...LINEAR(6.35029) },
    ],
  },
  temperature: {
    label: "Temperature",
    units: [
      {
        value: "c",
        label: "Celsius (°C)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        value: "f",
        label: "Fahrenheit (°F)",
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
      },
      {
        value: "k",
        label: "Kelvin (K)",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
  },
  speed: {
    label: "Speed",
    units: [
      { value: "mps", label: "Meters/sec (m/s)", ...LINEAR(1) },
      { value: "kph", label: "Kilometers/hr (km/h)", ...LINEAR(1 / 3.6) },
      { value: "mph", label: "Miles/hr (mph)", ...LINEAR(0.44704) },
      { value: "kn", label: "Knots (kn)", ...LINEAR(0.514444) },
      { value: "fps", label: "Feet/sec (ft/s)", ...LINEAR(0.3048) },
    ],
  },
  area: {
    label: "Area",
    units: [
      { value: "m2", label: "Square meters (m²)", ...LINEAR(1) },
      { value: "km2", label: "Square kilometers (km²)", ...LINEAR(1_000_000) },
      { value: "cm2", label: "Square centimeters (cm²)", ...LINEAR(0.0001) },
      { value: "ha", label: "Hectares (ha)", ...LINEAR(10_000) },
      { value: "acre", label: "Acres", ...LINEAR(4046.86) },
      { value: "ft2", label: "Square feet (ft²)", ...LINEAR(0.092903) },
      { value: "mi2", label: "Square miles (mi²)", ...LINEAR(2_589_988.11) },
    ],
  },
  volume: {
    label: "Volume",
    units: [
      { value: "l", label: "Liters (L)", ...LINEAR(1) },
      { value: "ml", label: "Milliliters (mL)", ...LINEAR(0.001) },
      { value: "m3", label: "Cubic meters (m³)", ...LINEAR(1000) },
      { value: "gal-us", label: "US Gallons", ...LINEAR(3.78541) },
      { value: "gal-uk", label: "UK Gallons", ...LINEAR(4.54609) },
      { value: "floz-us", label: "US Fluid ounces", ...LINEAR(0.0295735) },
      { value: "cup-us", label: "US Cups", ...LINEAR(0.236588) },
      { value: "pt-us", label: "US Pints", ...LINEAR(0.473176) },
    ],
  },
  data: {
    label: "Data Storage",
    units: [
      { value: "b", label: "Bytes (B)", ...LINEAR(1) },
      { value: "bit", label: "Bits", ...LINEAR(0.125) },
      { value: "kb", label: "Kilobytes (KB)", ...LINEAR(1024) },
      { value: "mb", label: "Megabytes (MB)", ...LINEAR(1024 ** 2) },
      { value: "gb", label: "Gigabytes (GB)", ...LINEAR(1024 ** 3) },
      { value: "tb", label: "Terabytes (TB)", ...LINEAR(1024 ** 4) },
    ],
  },
  time: {
    label: "Time",
    units: [
      { value: "s", label: "Seconds", ...LINEAR(1) },
      { value: "min", label: "Minutes", ...LINEAR(60) },
      { value: "hr", label: "Hours", ...LINEAR(3600) },
      { value: "day", label: "Days", ...LINEAR(86400) },
      { value: "wk", label: "Weeks", ...LINEAR(604800) },
      { value: "mo", label: "Months (avg)", ...LINEAR(2629800) },
      { value: "yr", label: "Years (avg)", ...LINEAR(31557600) },
    ],
  },
};

const CATEGORY_KEYS = Object.keys(CATEGORIES) as Category[];

function formatResult(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) === 0) return "0";
  if (Math.abs(n) >= 1e12 || (Math.abs(n) < 1e-6 && Math.abs(n) > 0)) {
    return n.toExponential(6).replace(/\.?0+e/, "e");
  }
  const rounded = parseFloat(n.toPrecision(10));
  return rounded.toLocaleString("en-US", { maximumFractionDigits: 8 });
}

export default function UnitConverterTool() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState("1");

  const units = CATEGORIES[category].units;
  const unitOptions = units.map((u) => ({ value: u.value, label: u.label }));

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (value.trim() === "" || Number.isNaN(num)) return null;
    const from = units.find((u) => u.value === fromUnit);
    const to = units.find((u) => u.value === toUnit);
    if (!from || !to) return null;
    const base = from.toBase(num);
    return to.fromBase(base);
  }, [value, fromUnit, toUnit, units]);

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const first = CATEGORIES[cat].units[0].value;
    const second = CATEGORIES[cat].units[1]?.value ?? first;
    setFromUnit(first);
    setToUnit(second);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result !== null) setValue(formatResult(result));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleCategoryChange(key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition",
              category === key
                ? "bg-accent text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            {CATEGORIES[key].label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolSelect label="From" value={fromUnit} onChange={setFromUnit} options={unitOptions} />
        <ToolSelect label="To" value={toUnit} onChange={setToUnit} options={unitOptions} />
      </div>

      <ToolInput label="Value" type="number" value={value} onChange={setValue} step={0.000001} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={swapUnits}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          aria-label="Swap units"
        >
          ⇄ Swap
        </button>
      </div>

      {result !== null && (
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label={`${units.find((u) => u.value === fromUnit)?.label ?? ""}`}
            value={`${value || "0"} =`}
          />
          <StatCard
            label={`${units.find((u) => u.value === toUnit)?.label ?? ""}`}
            value={formatResult(result)}
          />
        </div>
      )}
    </div>
  );
}
