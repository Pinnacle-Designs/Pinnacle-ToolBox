"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { StatCard } from "@/components/tools/ui";
import { getContrastRatio, hexToRgb } from "@/lib/utils";

function passesWcag(ratio: number, level: "AA" | "AAA", size: "normal" | "large") {
  if (level === "AAA") return size === "large" ? ratio >= 4.5 : ratio >= 7;
  return size === "large" ? ratio >= 3 : ratio >= 4.5;
}

export default function ContrastCheckerTool() {
  const [foreground, setForeground] = useState("#111827");
  const [background, setBackground] = useState("#ffffff");

  const valid = hexToRgb(foreground) && hexToRgb(background);
  const ratio = valid ? getContrastRatio(foreground, background) : 0;
  const ratioStr = valid ? ratio.toFixed(2) : "—";

  const results = useMemo(() => {
    if (!valid) return null;
    return {
      aaNormal: passesWcag(ratio, "AA", "normal"),
      aaLarge: passesWcag(ratio, "AA", "large"),
      aaaNormal: passesWcag(ratio, "AAA", "normal"),
      aaaLarge: passesWcag(ratio, "AAA", "large"),
    };
  }, [valid, ratio]);

  const PassFail = ({ pass }: { pass: boolean }) => (
    <span className={pass ? "font-medium text-green-700" : "font-medium text-red-600"}>
      {pass ? "Pass" : "Fail"}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fg-color" className="mb-1 block text-sm font-medium text-gray-700">
            Foreground (text)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="fg-color"
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="bg-color" className="mb-1 block text-sm font-medium text-gray-700">
            Background
          </label>
          <div className="flex items-center gap-3">
            <input
              id="bg-color"
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {valid ? (
        <>
          <div
            className="rounded-lg border border-gray-200 p-8 text-center"
            style={{ backgroundColor: background, color: foreground }}
          >
            <p className="text-2xl font-bold">Sample Heading</p>
            <p className="mt-2 text-base">The quick brown fox jumps over the lazy dog.</p>
            <p className="mt-1 text-sm opacity-90">Smaller body text for readability preview.</p>
          </div>

          <StatCard label="Contrast Ratio" value={`${ratioStr}:1`} />

          {results && (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">WCAG Level</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Normal Text</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-700">Large Text (18pt+)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2">AA (4.5:1 / 3:1)</td>
                    <td className="px-4 py-2"><PassFail pass={results.aaNormal} /></td>
                    <td className="px-4 py-2"><PassFail pass={results.aaLarge} /></td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-2">AAA (7:1 / 4.5:1)</td>
                    <td className="px-4 py-2"><PassFail pass={results.aaaNormal} /></td>
                    <td className="px-4 py-2"><PassFail pass={results.aaaLarge} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <CopyButton text={`Contrast ratio: ${ratioStr}:1`} label="Copy ratio" />
        </>
      ) : (
        <p className="text-sm text-red-600">Enter valid hex colors for both foreground and background.</p>
      )}
    </div>
  );
}
