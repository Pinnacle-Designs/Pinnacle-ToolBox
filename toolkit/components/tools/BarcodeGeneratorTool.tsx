"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { ToolInput, ToolButton, ToolSelect } from "@/components/tools/ui";
import { downloadBlob } from "@/lib/utils";

type BarcodeFormat = "CODE128" | "EAN13" | "UPC";

const FORMAT_OPTIONS: { value: BarcodeFormat; label: string; placeholder: string }[] = [
  { value: "CODE128", label: "CODE128", placeholder: "ABC-12345" },
  { value: "EAN13", label: "EAN-13", placeholder: "5901234123457" },
  { value: "UPC", label: "UPC-A", placeholder: "036000291452" },
];

export default function BarcodeGeneratorTool() {
  const [value, setValue] = useState("Pinnacle-Toolbox");
  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const placeholder = FORMAT_OPTIONS.find((f) => f.value === format)?.placeholder ?? "";

  const generate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !value.trim()) {
      setError("Enter a value to generate a barcode.");
      return;
    }
    setError(null);
    try {
      JsBarcode(canvas, value.trim(), {
        format,
        displayValue: true,
        fontSize: 16,
        height: 80,
        margin: 12,
        background: "#ffffff",
        lineColor: "#000000",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid barcode value for selected format.");
    }
  }, [value, format]);

  useEffect(() => {
    const timer = setTimeout(generate, 300);
    return () => clearTimeout(timer);
  }, [generate]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `barcode-${format.toLowerCase()}.png`);
    }, "image/png");
  };

  return (
    <div className="space-y-4">
      <ToolSelect
        label="Format"
        value={format}
        onChange={(v) => setFormat(v as BarcodeFormat)}
        options={FORMAT_OPTIONS.map((f) => ({ value: f.value, label: f.label }))}
      />
      <ToolInput
        label="Value"
        value={value}
        onChange={setValue}
      />
      <p className="text-xs text-gray-500">
        Example: {placeholder}.{" "}
        {format === "EAN13" && "EAN-13 requires exactly 12 or 13 digits."}
        {format === "UPC" && "UPC-A requires exactly 11 or 12 digits."}
        {format === "CODE128" && "CODE128 accepts alphanumeric characters and symbols."}
      </p>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <canvas ref={canvasRef} />
        </div>
        <div className="flex flex-wrap gap-2">
          <ToolButton onClick={generate}>Generate</ToolButton>
          <ToolButton onClick={downloadPng} variant="secondary">Download PNG</ToolButton>
        </div>
      </div>
    </div>
  );
}
