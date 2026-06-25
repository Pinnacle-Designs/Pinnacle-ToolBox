import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "About",
  "Learn about Pinnacle Toolbox — free browser-based online tools with no login required.",
  "/about"
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="surface-card p-8 prose-page">
        <h1 className="text-3xl font-bold">About Pinnacle Toolbox</h1>
        <p className="mt-4">
          Pinnacle Toolbox is a collection of free, browser-based online tools designed for speed,
          simplicity, and privacy. Whether you need to format JSON, resize an image, convert units,
          or generate a QR code, our tools work instantly in your browser.
        </p>
        <h2 className="mt-8 text-xl font-semibold">No login required</h2>
        <p>
          Every tool on Pinnacle Toolbox is free to use with no account creation, no subscriptions,
          and no hidden fees. Just open a tool and get to work.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Privacy first</h2>
        <p>
          All tools run entirely client-side in your browser. Your data is processed locally on your
          device and is never sent to our servers. When you upload a file, it stays on your machine.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Always growing</h2>
        <p>
          We are continuously adding new tools across categories including text processing, math and
          conversion, design and color, image editing, developer utilities, QR and barcode generation,
          time and productivity, and document creation.
        </p>
      </div>
    </div>
  );
}
