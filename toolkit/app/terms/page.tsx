import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = generatePageMetadata(
  "Terms of Use",
  "Terms of use for Pinnacle Toolbox free online tools. Acceptable use, disclaimers, and intellectual property.",
  "/terms",
  ["terms of use", "terms of service", "pinnacle toolbox legal"]
);

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="surface-card p-8 prose-page">
        <h1 className="text-3xl font-bold">Terms of Use</h1>
        <p className="mt-4 text-brand-silver-muted">Last updated: July 14, 2026</p>

        <h2 className="mt-8 text-xl font-semibold">Agreement</h2>
        <p>
          By using Pinnacle Toolbox (the &quot;Site&quot;) at pinnacletoolbox.com, you agree to these
          Terms of Use. If you do not agree, please do not use the Site.
        </p>

        <h2 className="mt-8 text-xl font-semibold">The service</h2>
        <p>
          Pinnacle Toolbox provides free, browser-based utility tools for personal and commercial use
          at your own risk. Tools process data in your browser. We do not guarantee uninterrupted
          access, specific results, or fitness for a particular purpose.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Acceptable use</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Do not attempt to disrupt, scrape abusively, or reverse-engineer the Site.</li>
          <li>Do not use tools to violate laws, harm others, or distribute malware.</li>
          <li>Do not upload content you do not have the right to process, even client-side.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">No professional advice</h2>
        <p>
          Output from calculators, converters, invoicing helpers, resume builders, and similar tools
          is for convenience only. It is not legal, tax, medical, financial, or professional advice.
          Verify critical results independently.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Advertising</h2>
        <p>
          The Site may display third-party advertisements (including Google AdSense). Ad networks may
          use cookies as described in our{" "}
          <Link href="/privacy" className="link-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <h2 className="mt-8 text-xl font-semibold">Intellectual property</h2>
        <p>
          Site branding, layout, and original written content are owned by Pinnacle Toolbox unless
          otherwise noted. You keep ownership of content you paste into tools.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Disclaimer of warranties</h2>
        <p>
          THE SITE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Pinnacle Toolbox is not liable for any indirect,
          incidental, or consequential damages arising from your use of the Site or tool outputs.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Changes</h2>
        <p>
          We may update these Terms. Continued use after changes means you accept the revised Terms.
          The &quot;Last updated&quot; date reflects the latest revision.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p>
          Questions? Visit our{" "}
          <Link href="/contact" className="link-brand hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
