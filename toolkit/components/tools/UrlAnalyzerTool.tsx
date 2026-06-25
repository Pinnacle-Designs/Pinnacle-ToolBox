"use client";

import { useMemo, useState } from "react";
import { ToolInput, OutputBox } from "@/components/tools/ui";
import CopyButton from "@/components/CopyButton";
import { cn } from "@/lib/utils";

interface SafetyCheck {
  label: string;
  passed: boolean;
  detail: string;
}

function analyzeUrl(input: string): { parts: Record<string, string>; checks: SafetyCheck[]; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { parts: {}, checks: [], error: null };

  let url: URL;
  try {
    const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;
    url = new URL(withProtocol);
  } catch {
    return { parts: {}, checks: [], error: "Invalid URL. Could not parse the input." };
  }

  const parts: Record<string, string> = {
    "Full URL": url.href,
    Protocol: url.protocol.replace(":", ""),
    Hostname: url.hostname,
    Port: url.port || "(default)",
    Pathname: url.pathname || "/",
    "Query String": url.search || "(none)",
    Hash: url.hash || "(none)",
    Username: url.username || "(none)",
    Password: url.password ? "••••••" : "(none)",
    Origin: url.origin,
  };

  const checks: SafetyCheck[] = [
    {
      label: "Uses HTTPS",
      passed: url.protocol === "https:",
      detail: url.protocol === "https:" ? "Connection is encrypted." : "HTTP is not encrypted — avoid entering sensitive data.",
    },
    {
      label: "No embedded credentials",
      passed: !url.username && !url.password,
      detail: url.username || url.password ? "URL contains username/password — a common phishing tactic." : "No credentials in the URL.",
    },
    {
      label: "Not an IP address",
      passed: !/^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname),
      detail: /^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname) ? "Hostname is a raw IP — verify you trust the destination." : "Uses a domain name.",
    },
    {
      label: "No suspicious punycode",
      passed: !url.hostname.includes("xn--"),
      detail: url.hostname.includes("xn--") ? "Punycode domain detected — may disguise lookalike characters." : "No punycode encoding detected.",
    },
    {
      label: "Reasonable URL length",
      passed: url.href.length < 2000,
      detail: url.href.length >= 2000 ? "Unusually long URL — may hide malicious content." : "URL length looks normal.",
    },
    {
      label: "No @ symbol in authority",
      passed: !url.href.match(/https?:\/\/[^/]*@/),
      detail: url.href.match(/https?:\/\/[^/]*@/) ? "@ in URL can trick users about the real host." : "No deceptive @ character found.",
    },
    {
      label: "Known safe protocol",
      passed: ["http:", "https:", "mailto:", "tel:"].includes(url.protocol),
      detail: ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? "Common web protocol." : `Unusual protocol: ${url.protocol}`,
    },
  ];

  return { parts, checks, error: null };
}

export default function UrlAnalyzerTool() {
  const [input, setInput] = useState("https://example.com/path?query=1#section");

  const { parts, checks, error } = useMemo(() => analyzeUrl(input), [input]);
  const passedCount = checks.filter((c) => c.passed).length;

  return (
    <div className="space-y-4">
      <ToolInput
        label="URL to Analyze"
        value={input}
        onChange={setInput}
      />

      <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
        This tool parses URLs locally in your browser. It does not follow redirects, fetch remote content, or check blocklists. Always verify links before clicking.
      </p>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {Object.keys(parts).length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">URL Components</h3>
            <CopyButton text={parts["Full URL"] ?? ""} label="Copy URL" />
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(parts).map(([key, val]) => (
                  <tr key={key} className="border-b border-gray-100 last:border-0">
                    <td className="bg-gray-50 px-3 py-2 font-medium text-gray-700">{key}</td>
                    <td className="break-all px-3 py-2 font-mono text-gray-900">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {checks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Safety Checklist</h3>
            <span className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              passedCount === checks.length ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            )}>
              {passedCount}/{checks.length} passed
            </span>
          </div>
          <ul className="space-y-2">
            {checks.map((check) => (
              <li
                key={check.label}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm",
                  check.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                )}
              >
                <span className={cn("font-medium", check.passed ? "text-green-800" : "text-red-800")}>
                  {check.passed ? "✓" : "✗"} {check.label}
                </span>
                <p className={cn("mt-0.5", check.passed ? "text-green-700" : "text-red-700")}>{check.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {input && !error && Object.keys(parts).length > 0 && (
        <OutputBox label="Decoded Query Parameters" value={
          (() => {
            try {
              const u = new URL(parts["Full URL"]);
              const params = Array.from(u.searchParams.entries());
              if (params.length === 0) return "(no query parameters)";
              return params.map(([k, v]) => `${k} = ${v}`).join("\n");
            } catch { return "—"; }
          })()
        } />
      )}
    </div>
  );
}
