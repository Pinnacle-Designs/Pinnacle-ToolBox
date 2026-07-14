import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Write Clearer Web Copy With Readability Scores",
  "Improve landing pages and help articles using Flesch Reading Ease, sentence length, and word counts—without watering down your expertise.",
  "/guides/write-clearer-web-copy",
  ["readability score", "flesch reading ease", "clear writing", "web copy tips"]
);

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-brand-silver-muted">
        <Link href="/guides" className="link-brand">
          Guides
        </Link>{" "}
        / Writing
      </p>
      <h1 className="mt-3 text-3xl font-bold text-brand-white">
        Write Clearer Web Copy With Readability Scores
      </h1>
      <p className="mt-2 text-sm text-brand-silver-muted">Updated July 14, 2026 · ~6 min read</p>

      <div className="prose-page mt-8 space-y-4 text-brand-silver">
        <p>
          Readability scores estimate how hard a passage is to scan. They are imperfect—but useful as
          a dashboard light when your help center sounds like a research paper and your buyers bounce.
          Combine scores with human judgment: experts may need technical terms; they still benefit from
          short paragraphs and one idea per sentence.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">A simple editing loop</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Count length with the{" "}
            <Link href="/tools/word-counter" className="link-brand hover:underline">
              Word Counter
            </Link>
            .
          </li>
          <li>
            Score clarity with the{" "}
            <Link href="/tools/readability-checker" className="link-brand hover:underline">
              Readability Checker
            </Link>
            .
          </li>
          <li>Split sentences longer than ~25 words when they hide the action.</li>
          <li>
            Scan repetition with{" "}
            <Link href="/tools/word-frequency" className="link-brand hover:underline">
              Word Frequency
            </Link>
            .
          </li>
          <li>Re-check until the grade level matches your audience.</li>
        </ol>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">What “good” looks like online</h2>
        <p>
          Many general web readers are comfortable around Flesch 60–70. That does not mean you must
          dump accuracy. Replace abstract nouns with concrete verbs, define jargon once, and use
          headings so skimmers still find answers. Legal and medical pages often score harder—and
          should be reviewed by specialists.
        </p>
        <p>
          Scores ignore design: font size, contrast, and mobile line length also affect comprehension.
          Pair writing fixes with accessible layout. After you ship, watch support tickets—real
          confusion beats any formula.
        </p>
      </div>
    </article>
  );
}
