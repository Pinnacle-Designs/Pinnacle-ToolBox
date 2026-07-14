import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Why Client-Side Tools Matter for Privacy",
  "How browser-based utilities keep drafts and files on your device—and why that matters for privacy compared with cloud upload tools.",
  "/guides/why-client-side-tools-matter",
  ["client-side tools", "browser privacy", "local processing", "online tools privacy"]
);

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-brand-silver-muted">
        <Link href="/guides" className="link-brand">
          Guides
        </Link>{" "}
        / Privacy
      </p>
      <h1 className="mt-3 text-3xl font-bold text-brand-white">
        Why Client-Side Tools Matter for Privacy
      </h1>
      <p className="mt-2 text-sm text-brand-silver-muted">Updated July 14, 2026 · ~6 min read</p>

      <div className="prose-page mt-8 space-y-4 text-brand-silver">
        <p>
          Many online utilities ask you to upload a file or paste sensitive text so a remote server
          can process it. That is convenient—until you realize the draft resume, customer CSV, or API
          token briefly lived on someone else&apos;s disk. Client-side tools flip the model: the
          browser downloads JavaScript once, then computes results with Canvas, Web Crypto, and
          other local APIs.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">What “client-side” actually means</h2>
        <p>
          When you format JSON, compress a PNG, or generate a password on Pinnacle Toolbox, the
          heavy lifting happens inside your tab. We do not receive the payload as form data for tool
          execution. You might still use a contact form or analytics cookies elsewhere on a site, but
          the tool workflow itself does not require an upload pipeline.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">When uploads still make sense</h2>
        <p>
          Cloud tools shine for collaboration, huge video jobs, or models too large for a phone. If
          your team co-edits a document, a server is appropriate. For one-off private conversions—like
          stripping EXIF from a vacation photo or hashing a password you are about to rotate—local
          tools reduce unnecessary sharing.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">Practical habits</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Avoid pasting secrets into any site you do not trust, even client-side ones.</li>
          <li>Prefer HTTPS so scripts and pages are delivered securely.</li>
          <li>Close the tab when finished if you used a shared computer.</li>
          <li>
            Use our{" "}
            <Link href="/tools/exif-remover" className="link-brand hover:underline">
              EXIF Remover
            </Link>{" "}
            before posting photos publicly.
          </li>
        </ul>
        <p>
          Privacy is a spectrum. Client-side design removes one common risk—silent server storage of
          your one-time utility jobs—without replacing antivirus, phishing awareness, or good password
          hygiene.
        </p>
      </div>
    </article>
  );
}
