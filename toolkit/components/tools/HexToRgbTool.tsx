"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolInput, OutputBox } from "@/components/tools/ui";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
} from "@/lib/utils";

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export default function HexToRgbTool() {
  const [hex, setHex] = useState("#3b82f6");

  const parsed = useMemo(() => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    return { rgb, hsl, hsv, validHex: rgbToHex(rgb.r, rgb.g, rgb.b) };
  }, [hex]);

  const rgbStr = parsed ? `rgb(${parsed.rgb.r}, ${parsed.rgb.g}, ${parsed.rgb.b})` : "";
  const hslStr = parsed ? `hsl(${parsed.hsl.h}, ${parsed.hsl.s}%, ${parsed.hsl.l}%)` : "";
  const hsvStr = parsed ? `hsv(${parsed.hsv.h}, ${parsed.hsv.s}%, ${parsed.hsv.v}%)` : "";

  return (
    <div className="space-y-6">
      <ToolInput
        label="HEX Color"
        value={hex}
        onChange={(v) => setHex(v.startsWith("#") ? v : `#${v}`)}
      />

      {parsed ? (
        <>
          <div
            className="h-24 w-full rounded-lg border border-gray-200 shadow-inner"
            style={{ backgroundColor: parsed.validHex }}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <OutputBox label="RGB" value={rgbStr} />
            <OutputBox label="HSL" value={hslStr} />
            <OutputBox label="HSV" value={hsvStr} />
            <OutputBox label="HEX" value={parsed.validHex} />
          </div>

          <div className="flex flex-wrap gap-2">
            <CopyButton text={rgbStr} label="Copy RGB" />
            <CopyButton text={hslStr} label="Copy HSL" />
            <CopyButton text={hsvStr} label="Copy HSV" />
            <CopyButton text={parsed.validHex} label="Copy HEX" />
          </div>
        </>
      ) : (
        <p className="text-sm text-red-600">Enter a valid 6-digit hex color (e.g. #3b82f6).</p>
      )}
    </div>
  );
}
