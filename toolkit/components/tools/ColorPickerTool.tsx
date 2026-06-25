"use client";

import { useCallback, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { OutputBox } from "@/components/tools/ui";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/utils";

export default function ColorPickerTool() {
  const [hex, setHex] = useState("#3b82f6");

  const rgb = hexToRgb(hex) ?? { r: 59, g: 130, b: 246 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    setHex(rgbToHex(r, g, b));
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const next = hslToRgb(h, s, l);
    setHex(rgbToHex(next.r, next.g, next.b));
  }, []);

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="color-picker" className="mb-1 block text-sm font-medium text-gray-700">
            Pick a color
          </label>
          <input
            id="color-picker"
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-12 w-24 cursor-pointer rounded border border-gray-300"
          />
        </div>
        <div
          className="h-12 flex-1 min-w-[120px] rounded-lg border border-gray-200"
          style={{ backgroundColor: hex }}
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">RGB Sliders</p>
        {(["r", "g", "b"] as const).map((ch) => (
          <div key={ch}>
            <label className="mb-1 flex justify-between text-sm text-gray-600">
              <span className="uppercase">{ch}</span>
              <span>{rgb[ch]}</span>
            </label>
            <input
              type="range"
              min={0}
              max={255}
              value={rgb[ch]}
              onChange={(e) => {
                const v = Number(e.target.value);
                updateFromRgb(
                  ch === "r" ? v : rgb.r,
                  ch === "g" ? v : rgb.g,
                  ch === "b" ? v : rgb.b
                );
              }}
              className="w-full accent-accent"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">HSL Sliders</p>
        {(
          [
            { key: "h" as const, label: "Hue", max: 360 },
            { key: "s" as const, label: "Saturation", max: 100 },
            { key: "l" as const, label: "Lightness", max: 100 },
          ] as const
        ).map(({ key, label, max }) => (
          <div key={key}>
            <label className="mb-1 flex justify-between text-sm text-gray-600">
              <span>{label}</span>
              <span>{hsl[key]}{key === "h" ? "°" : "%"}</span>
            </label>
            <input
              type="range"
              min={0}
              max={max}
              value={hsl[key]}
              onChange={(e) => {
                const v = Number(e.target.value);
                updateFromHsl(
                  key === "h" ? v : hsl.h,
                  key === "s" ? v : hsl.s,
                  key === "l" ? v : hsl.l
                );
              }}
              className="w-full accent-accent"
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <OutputBox label="HEX" value={hex} />
        <OutputBox label="RGB" value={rgbStr} />
        <OutputBox label="HSL" value={hslStr} />
      </div>

      <CopyButton text={hex} label="Copy HEX" />
    </div>
  );
}
