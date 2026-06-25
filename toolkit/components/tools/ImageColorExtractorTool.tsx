"use client";

import { useCallback, useRef, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolButton } from "@/components/tools/ui";
import { rgbToHex } from "@/lib/utils";

interface ExtractedColor {
  hex: string;
  count: number;
  percent: number;
}

function quantize(value: number, step: number) {
  return Math.round(value / step) * step;
}

function extractTopColors(imageData: ImageData, topN = 8): ExtractedColor[] {
  const data = imageData.data;
  const counts = new Map<string, number>();
  const step = 16;

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = quantize(data[i], step);
    const g = quantize(data[i + 1], step);
    const b = quantize(data[i + 2], step);
    const hex = rgbToHex(r, g, b);
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }

  const total = Array.from(counts.values()).reduce((s, c) => s + c, 0) || 1;
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([hex, count]) => ({
      hex,
      count,
      percent: Math.round((count / total) * 1000) / 10,
    }));
}

export default function ImageColorExtractorTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        URL.revokeObjectURL(url);
        return;
      }

      const maxDim = 200;
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas not supported.");
        URL.revokeObjectURL(url);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      setColors(extractTopColors(imageData, 8));
      setPreview(url);
    };
    img.onerror = () => {
      setError("Failed to load image.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-accent/90"
        />
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {error && <p className="text-sm text-red-600">{error}</p>}

      {preview && (
        <img src={preview} alt="Uploaded preview" className="max-h-48 rounded-lg border border-gray-200" />
      )}

      {colors.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colors.map((c) => (
              <div key={c.hex} className="space-y-2 rounded-lg border border-gray-200 p-3">
                <div
                  className="h-16 w-full rounded border border-gray-200"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="font-mono text-sm">{c.hex}</p>
                <p className="text-xs text-gray-500">{c.percent}% of image</p>
                <CopyButton text={c.hex} label="Copy" className="w-full justify-center text-xs" />
              </div>
            ))}
          </div>

          <CopyButton
            text={colors.map((c) => c.hex).join(", ")}
            label="Copy all colors"
          />
        </>
      )}

      {preview && colors.length === 0 && (
        <ToolButton onClick={() => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (canvas && ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            setColors(extractTopColors(imageData, 8));
          }
        }}>
          Extract Colors
        </ToolButton>
      )}
    </div>
  );
}
