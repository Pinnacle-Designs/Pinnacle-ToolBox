"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolInput } from "@/components/tools/ui";
import { generateTintsShades, hexToRgb } from "@/lib/utils";

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="space-y-1 text-center">
      <div
        className="aspect-square w-full rounded border border-gray-200"
        style={{ backgroundColor: color }}
        title={color}
      />
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-mono text-[10px] text-gray-600">{color}</p>
    </div>
  );
}

export default function TintShadeGeneratorTool() {
  const [hex, setHex] = useState("#3b82f6");

  const { tints, shades } = useMemo(() => generateTintsShades(hex, 10), [hex]);
  const valid = hexToRgb(hex) !== null;
  const allColors = [...tints, hex, ...shades].join(", ");

  return (
    <div className="space-y-6">
      <ToolInput
        label="Base Color (HEX)"
        value={hex}
        onChange={(v) => setHex(v.startsWith("#") ? v : `#${v}`)}
      />

      {valid ? (
        <>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">10 Tints (lighter)</p>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {tints.map((color, i) => (
                <ColorSwatch key={`tint-${i}`} color={color} label={`${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-24 space-y-1 text-center">
              <div
                className="aspect-square w-full rounded border-2 border-gray-300"
                style={{ backgroundColor: hex }}
              />
              <p className="text-xs font-medium text-gray-700">Base</p>
              <p className="font-mono text-[10px]">{hex}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">10 Shades (darker)</p>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {shades.map((color, i) => (
                <ColorSwatch key={`shade-${i}`} color={color} label={`${i + 1}`} />
              ))}
            </div>
          </div>

          <CopyButton text={allColors} label="Copy all colors" />
        </>
      ) : (
        <p className="text-sm text-red-600">Enter a valid hex color.</p>
      )}
    </div>
  );
}
