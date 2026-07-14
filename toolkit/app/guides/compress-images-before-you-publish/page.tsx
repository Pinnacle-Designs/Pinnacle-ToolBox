import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Compress Images Before You Publish",
  "Reduce image file sizes for faster pages without wrecking quality—and strip EXIF when privacy matters.",
  "/guides/compress-images-before-you-publish",
  ["image compression", "reduce image size", "exif privacy", "web performance images"]
);

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-brand-silver-muted">
        <Link href="/guides" className="link-brand">
          Guides
        </Link>{" "}
        / Images
      </p>
      <h1 className="mt-3 text-3xl font-bold text-brand-white">
        Compress Images Before You Publish
      </h1>
      <p className="mt-2 text-sm text-brand-silver-muted">Updated July 14, 2026 · ~6 min read</p>

      <div className="prose-page mt-8 space-y-4 text-brand-silver">
        <p>
          Large camera uploads slow blogs, portfolios, and product pages. Compression lowers bytes
          while keeping enough quality for screens. Start with dimensions: a 4000px phone photo rarely
          needs full resolution for a 1200px content column. Then compress, and finally consider EXIF
          if the photo embeds GPS or device details you would rather not publish.
        </p>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">A practical pipeline</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Resize to the display width you actually need with the{" "}
            <Link href="/tools/image-resizer" className="link-brand hover:underline">
              Image Resizer
            </Link>
            .
          </li>
          <li>
            Reduce quality gently with the{" "}
            <Link href="/tools/image-compressor" className="link-brand hover:underline">
              Image Compressor
            </Link>
            —compare file sizes visually.
          </li>
          <li>
            Convert formats when helpful (
            <Link href="/tools/image-converter" className="link-brand hover:underline">
              Image Converter
            </Link>
            )—WebP often beats JPEG for photos on modern browsers.
          </li>
          <li>
            Strip metadata with the{" "}
            <Link href="/tools/exif-remover" className="link-brand hover:underline">
              EXIF Remover
            </Link>{" "}
            before sharing personal photos.
          </li>
        </ol>
        <h2 className="pt-2 text-xl font-semibold text-brand-white">Quality tips</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Product close-ups tolerate less compression than abstract backgrounds.</li>
          <li>Screenshots often look sharper as PNG; photos compress better as JPEG/WebP.</li>
          <li>Always keep an original backup offline before irreversible saves.</li>
        </ul>
        <p>
          Client-side compression means sample product photos stay on your laptop during trials. Still
          treat customer assets carefully and obtain rights before publishing.
        </p>
      </div>
    </article>
  );
}
