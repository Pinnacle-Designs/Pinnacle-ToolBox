"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ text, label = "Copy", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-brand-navy-light/50 bg-brand-navy/50 px-3 py-2 text-sm font-medium text-brand-white transition hover:border-brand-blue/50 hover:bg-brand-navy-light/40 disabled:opacity-50",
        className
      )}
    >
      {copied ? <Check className="h-4 w-4 text-brand-blue" /> : <Copy className="h-4 w-4 text-brand-silver" />}
      {copied ? "Copied!" : label}
    </button>
  );
}
