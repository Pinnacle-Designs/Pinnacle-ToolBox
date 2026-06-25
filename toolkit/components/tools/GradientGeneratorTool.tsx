"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolInput, ToolButton } from "@/components/tools/ui";

export default function GradientGeneratorTool() {
  const [colors, setColors] = useState(["#3b82f6", "#8b5cf6", "#ec4899"]);
  const [angle, setAngle] = useState(90);

  const gradientCss = useMemo(() => {
    const stops = colors.join(", ");
    return `linear-gradient(${angle}deg, ${stops})`;
  }, [colors, angle]);

  const fullCss = `background: ${gradientCss};`;

  const updateColor = (index: number, value: string) => {
    setColors((prev) => prev.map((c, i) => (i === index ? value : c)));
  };

  return (
    <div className="space-y-6">
      <ToolInput
        label="Angle (degrees)"
        type="number"
        value={angle}
        min={0}
        max={360}
        onChange={(v) => setAngle(Math.max(0, Math.min(360, Number(v) || 0)))}
      />

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Colors</p>
        {colors.map((color, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(i, e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-gray-300"
              aria-label={`Color ${i + 1}`}
            />
            <input
              type="text"
              value={color}
              onChange={(e) => updateColor(i, e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
            />
            {colors.length > 2 && (
              <ToolButton variant="secondary" onClick={() => setColors((prev) => prev.filter((_, j) => j !== i))}>
                Remove
              </ToolButton>
            )}
          </div>
        ))}
        <ToolButton variant="secondary" onClick={() => setColors((prev) => [...prev, "#10b981"])}>
          Add Color
        </ToolButton>
      </div>

      <div
        className="h-32 w-full rounded-lg border border-gray-200 shadow-inner"
        style={{ background: gradientCss }}
      />

      <div>
        <p className="mb-1 text-sm font-medium text-gray-700">CSS</p>
        <pre className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm whitespace-pre-wrap break-words">
          {fullCss}
        </pre>
        <div className="mt-2 flex flex-wrap gap-2">
          <CopyButton text={fullCss} label="Copy CSS" />
          <CopyButton text={gradientCss} label="Copy gradient value" />
        </div>
      </div>
    </div>
  );
}
