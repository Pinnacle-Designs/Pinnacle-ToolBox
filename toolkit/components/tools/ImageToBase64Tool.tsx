"use client";

import { useCallback, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { ToolTextarea, StatCard } from "@/components/tools/ui";
import { formatBytes } from "@/lib/utils";

export default function ImageToBase64Tool() {
  const [base64, setBase64] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(",");
      setDataUrl(result);
      setBase64(comma >= 0 ? result.slice(comma + 1) : result);
      setFileName(file.name);
      setFileSize(file.size);
      setPreview(result);
    };
    reader.onerror = () => setError("Failed to read file.");
    reader.readAsDataURL(file);
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
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {preview && (
        <>
          <img src={preview} alt="Preview" className="max-h-48 rounded-lg border border-gray-200" />

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="File Name" value={fileName} />
            <StatCard label="File Size" value={formatBytes(fileSize)} />
          </div>

          <ToolTextarea
            label="Base64 String"
            value={base64}
            onChange={() => {}}
            rows={6}
          />

          <ToolTextarea
            label="Data URL"
            value={dataUrl}
            onChange={() => {}}
            rows={4}
          />

          <div className="flex flex-wrap gap-2">
            <CopyButton text={base64} label="Copy Base64" />
            <CopyButton text={dataUrl} label="Copy Data URL" />
          </div>
        </>
      )}
    </div>
  );
}
