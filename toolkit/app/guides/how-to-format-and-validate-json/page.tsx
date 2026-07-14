import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "How to Format and Validate JSON",
  "Fix invalid JSON commas and braces, pretty-print API responses, and minify payloads using a free online JSON formatter.",
  "/guides/how-to-format-and-validate-json",
  ["json formatter", "validate json", "pretty print json", "minify json"]
);

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-brand-silver-muted">
        <Link href="/guides" className="link-brand">
          Guides
        </Link>{" "}
        / Developer
      </p>
      <h1 className="mt-3 text-3xl font-bold text-brand-white">
        How to Format and Validate JSON Without an IDE
      </h1>
      <p className="mt-2 text-sm text-brand-silver-muted">Updated July 14, 2026 · ~7 min read</p>

      <div className="prose-page mt-8 space-y-4 text-brand-silver">
        <p>
          Broken JSON usually fails for simple reasons: a trailing comma, a single quote instead of
          double quotes, or a truncated paste from a log. You do not always need to open VS Code. A
          browser formatter can pretty-print nested objects and surface the first parse error so you
          can repair payloads quickly.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">Step-by-step</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Open the{" "}
            <Link href="/tools/json-formatter" className="link-brand hover:underline">
              JSON Formatter
            </Link>
            .
          </li>
          <li>Paste the full response or config file—including the outer braces or brackets.</li>
          <li>Run Format / Validate and read any error message carefully.</li>
          <li>Fix the reported line (often a trailing comma) and re-check.</li>
          <li>Minify only when you need a compact body for an API gateway or embed.</li>
        </ol>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">Common mistakes</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>JSON requires double quotes around property names and string values.</li>
          <li>Comments (`//`) are invalid in strict JSON—even if JavaScript allows them.</li>
          <li>NaN and Infinity are not valid JSON numbers.</li>
          <li>Binary or blob fields should be encoded (often Base64) as strings.</li>
        </ul>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">Moving data further</h2>
        <p>
          Need a spreadsheet? Convert arrays of objects with{" "}
          <Link href="/tools/json-to-csv" className="link-brand hover:underline">
            JSON to CSV
          </Link>
          . Coming from Excel? Start with{" "}
          <Link href="/tools/csv-to-json" className="link-brand hover:underline">
            CSV to JSON
          </Link>
          , then format. For tokens that look opaque, the{" "}
          <Link href="/tools/jwt-decoder" className="link-brand hover:underline">
            JWT Decoder
          </Link>{" "}
          shows claims without verifying signatures—never paste production secrets into untrusted
          environments.
        </p>
      </div>
    </article>
  );
}
