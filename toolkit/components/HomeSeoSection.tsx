import Link from "next/link";
import { getAllCategorySeo } from "@/lib/category-seo";
import { getToolCount } from "@/lib/tools";
import { SITE_NAME } from "@/lib/utils";

export default function HomeSeoSection() {
  const count = getToolCount();
  const categories = getAllCategorySeo();

  return (
    <section
      className="border-t border-brand-navy-light/30 bg-brand-navy/20"
      aria-labelledby="home-seo-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-14">
        <h2 id="home-seo-heading" className="text-2xl font-bold text-brand-white md:text-3xl">
          {count}+ Free Online Tools — No Login, No Upload
        </h2>
        <div className="mt-4 max-w-4xl space-y-4 text-sm leading-relaxed text-brand-silver md:text-base">
          <p>
            {SITE_NAME} is a free collection of browser-based utilities for text processing, image
            editing, developer workflows, math and unit conversion, design and color, QR codes,
            productivity, and documents. Every tool runs entirely in your browser — your files and
            data never leave your device.
          </p>
          <p>
            Unlike traditional online tools that upload your content to remote servers, our
            client-side approach keeps your work private. No account creation, no subscriptions, and
            no waiting in queues. Just open a tool and get instant results on desktop or mobile.
          </p>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-brand-white">Browse by category</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="rounded-xl border border-brand-navy-light/35 bg-brand-navy/40 p-4 transition hover:border-brand-blue/50 hover:bg-brand-navy-light/30"
            >
              <h4 className="font-medium text-brand-white">{cat.title}</h4>
              <p className="mt-1 text-sm text-brand-silver-muted line-clamp-2">
                {cat.metaDescription.slice(0, 100)}…
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-brand-navy-light/35 bg-brand-navy/30 p-6">
          <h3 className="text-lg font-semibold text-brand-white">Popular free tools</h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {[
              ["JSON Formatter", "/tools/json-formatter"],
              ["Word Counter", "/tools/word-counter"],
              ["QR Code Generator", "/tools/qr-generator"],
              ["Image Compressor", "/tools/image-compressor"],
              ["Password Generator", "/tools/password-generator"],
              ["Unit Converter", "/tools/unit-converter"],
              ["Base64 Encoder", "/tools/base64-encoder"],
              ["HEX to RGB", "/tools/hex-to-rgb"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="link-brand">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
