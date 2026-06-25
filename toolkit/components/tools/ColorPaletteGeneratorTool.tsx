"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolInput, ToolSelect } from "@/components/tools/ui";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/utils";

type Scheme = "complementary" | "analogous" | "triadic" | "tetradic" | "monochromatic";

function generatePalette(hex: string, scheme: Scheme): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const fromHsl = (hue: number, sat = s, light = l) => {
    const c = hslToRgb(((hue % 360) + 360) % 360, sat, light);
    return rgbToHex(c.r, c.g, c.b);
  };

  switch (scheme) {
    case "complementary":
      return [hex, fromHsl(h + 180)];
    case "analogous":
      return [fromHsl(h - 30), hex, fromHsl(h + 30)];
    case "triadic":
      return [hex, fromHsl(h + 120), fromHsl(h + 240)];
    case "tetradic":
      return [hex, fromHsl(h + 90), fromHsl(h + 180), fromHsl(h + 270)];
    case "monochromatic":
      return [20, 35, 50, 65, 80].map((lightness) => fromHsl(h, s, lightness));
    default:
      return [hex];
  }
}

const SCHEME_OPTIONS: { value: Scheme; label: string }[] = [
  { value: "complementary", label: "Complementary" },
  { value: "analogous", label: "Analogous" },
  { value: "triadic", label: "Triadic" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Monochromatic" },
];

export default function ColorPaletteGeneratorTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [scheme, setScheme] = useState<Scheme>("complementary");

  const palette = useMemo(() => generatePalette(hex, scheme), [hex, scheme]);
  const cssVars = palette.map((c, i) => `--color-${i + 1}: ${c};`).join("\n");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolInput
          label="Base Color (HEX)"
          value={hex}
          onChange={(v) => setHex(v.startsWith("#") ? v : `#${v}`)}
        />
        <ToolSelect
          label="Color Scheme"
          value={scheme}
          onChange={(v) => setScheme(v as Scheme)}
          options={SCHEME_OPTIONS}
        />
      </div>

      {palette.length > 0 ? (
        <>
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${palette.length}, minmax(0, 1fr))` }}>
            {palette.map((color) => (
              <div key={color} className="space-y-2 text-center">
                <div
                  className="aspect-square w-full rounded-lg border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <p className="font-mono text-xs text-gray-600">{color}</p>
                <CopyButton text={color} label="Copy" className="w-full justify-center text-xs" />
              </div>
            ))}
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">CSS Variables</p>
            <pre className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">{`:root {\n  ${cssVars.replace(/\n/g, "\n  ")}\n}`}</pre>
            <div className="mt-2">
              <CopyButton text={`:root {\n  ${cssVars.replace(/\n/g, "\n  ")}\n}`} label="Copy CSS" />
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600">Enter a valid hex color.</p>
      )}
    </div>
  );
}
