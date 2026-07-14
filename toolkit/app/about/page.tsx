import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import { getToolCount } from "@/lib/tools";

export const metadata = generatePageMetadata(
  "About",
  "Learn about Pinnacle Toolbox — 60+ free browser-based online tools for text, images, code, and productivity. No login, no data collection.",
  "/about",
  ["about pinnacle toolbox", "free online tools", "browser-based utilities", "privacy-first tools"]
);

export default function AboutPage() {
  const count = getToolCount();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="surface-card space-y-6 p-8 text-brand-silver">
        <h1 className="text-3xl font-bold text-brand-white">About Pinnacle Toolbox</h1>
        <p>
          Pinnacle Toolbox is a free collection of {count}+ browser-based utilities for everyday work:
          writing, math, design, images, developers, QR codes, time planning, and documents. We built
          it for people who need a quick answer without creating an account, installing software, or
          uploading drafts to a random SaaS dashboard.
        </p>
        <p>
          Every tool runs entirely on your device using modern web APIs. That means formatting JSON,
          compressing an image, generating a password, or counting words happens locally. We do not
          store tool input in a database, and we do not require sign-in to use the site.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-brand-white">Who it is for</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Students checking essay length, readability, and citations notes.</li>
          <li>Developers validating JSON, decoding JWTs, testing regex, or generating UUIDs.</li>
          <li>Designers converting colors, checking contrast, and building palettes.</li>
          <li>Freelancers creating invoices, resumes, and cleaning spreadsheet data.</li>
          <li>Anyone who wants private, fast utilities without installing desktop apps.</li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-brand-white">What makes us different</h2>
        <p>
          Many “online tools” sites are thin pages stuffed with ads and almost no explanation. Our
          pages include clear descriptions, practical how-to steps, and FAQs written for each tool’s
          real features—not a single template copied sixty times. We also publish guides on privacy,
          formatting, and everyday workflows so the site is useful beyond a single button click.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-brand-white">Categories we cover</h2>
        <p>
          Browse {count} tools across text, math and conversion, design and color, image editing,
          developer utilities, QR and barcode generation, productivity timers, and document helpers.
          Start from the{" "}
          <Link href="/" className="link-brand hover:underline">
            homepage
          </Link>{" "}
          or jump into popular tools like the{" "}
          <Link href="/tools/json-formatter" className="link-brand hover:underline">
            JSON Formatter
          </Link>
          ,{" "}
          <Link href="/tools/word-counter" className="link-brand hover:underline">
            Word Counter
          </Link>
          , and{" "}
          <Link href="/tools/qr-generator" className="link-brand hover:underline">
            QR Generator
          </Link>
          .
        </p>

        <h2 className="pt-2 text-xl font-semibold text-brand-white">Advertising &amp; funding</h2>
        <p>
          Pinnacle Toolbox is free to use. We may show Google AdSense ads to keep the site online.
          Ads do not change tool behavior or require you to upload your files. See our{" "}
          <Link href="/privacy" className="link-brand hover:underline">
            Privacy Policy
          </Link>{" "}
          for cookie details and how to opt out of personalized ads.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-brand-white">Contact</h2>
        <p>
          Have a bug report or tool idea?{" "}
          <Link href="/contact" className="link-brand hover:underline">
            Contact us
          </Link>
          —we read every message.
        </p>
      </div>
    </div>
  );
}
