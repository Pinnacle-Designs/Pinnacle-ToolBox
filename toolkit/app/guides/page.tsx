import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Guides",
  "Practical guides from Pinnacle Toolbox on privacy-first browser tools, formatting JSON, checking readability, and more.",
  "/guides",
  ["online tools guides", "browser privacy guides", "json formatting tips", "readability tips"]
);

const GUIDES = [
  {
    slug: "why-client-side-tools-matter",
    title: "Why Client-Side Tools Matter for Privacy",
    summary:
      "Learn how browser-based utilities process files and text locally—and when you should avoid uploading drafts to random websites.",
  },
  {
    slug: "how-to-format-and-validate-json",
    title: "How to Format and Validate JSON Without an IDE",
    summary:
      "A practical walkthrough for fixing commas, nesting errors, and minifying API payloads with a free online JSON formatter.",
  },
  {
    slug: "write-clearer-web-copy",
    title: "Write Clearer Web Copy With Readability Scores",
    summary:
      "Use Flesch Reading Ease and length targets to make landing pages and help articles easier to skim without dumbing down your message.",
  },
  {
    slug: "compress-images-before-you-publish",
    title: "Compress Images Before You Publish",
    summary:
      "Balance quality and file size for blogs, product photos, and portfolio sites—plus why stripping EXIF can protect privacy.",
  },
] as const;

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-brand-white">Guides</h1>
        <p className="mt-3 text-brand-silver">
          Short, practical articles that explain how to get more from free browser tools—and how to
          keep your work private while you do it.
        </p>
      </div>
      <ul className="space-y-4">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="surface-card block p-6 transition hover:border-brand-orange/40"
            >
              <h2 className="text-lg font-semibold text-brand-white">{guide.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-silver">{guide.summary}</p>
              <span className="mt-3 inline-block text-sm text-brand-orange">Read guide →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
