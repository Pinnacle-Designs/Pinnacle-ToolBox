import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolsByCategory } from "@/lib/tools";
import { getCategoryBySlug, getAllCategorySeo } from "@/lib/category-seo";
import { generateCategoryMetadata, generateCategoryPageJsonLd } from "@/lib/seo";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllCategorySeo().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  return generateCategoryMetadata(params.slug);
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.category);
  const jsonLd = generateCategoryPageJsonLd(params.slug);

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      )}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-brand-silver-muted">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="link-brand">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-brand-navy-light">
              /
            </li>
            <li className="font-medium text-brand-white" aria-current="page">
              {category.category}
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-brand-white md:text-4xl">{category.title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-silver">
          {category.intro}
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {category.benefits.map((benefit) => (
            <li
              key={benefit}
              className="rounded-lg border border-brand-navy-light/35 bg-brand-navy/30 px-4 py-3 text-sm text-brand-silver"
            >
              {benefit}
            </li>
          ))}
        </ul>

        <AdSlot size="banner" className="my-10" />

        <h2 className="section-title mb-6">
          All {category.category} ({categoryTools.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              icon={tool.icon}
              title={tool.name}
              description={tool.description}
              href={`/tools/${tool.slug}`}
              category={tool.category}
            />
          ))}
        </div>

        <section className="mt-14 rounded-xl border border-brand-navy-light/35 bg-brand-navy/30 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-brand-white">
            Why use {category.title.toLowerCase()} from Pinnacle Toolbox?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-silver">
            Every tool in our {category.category.toLowerCase()} collection runs entirely in your
            browser. There is no software to install, no account to create, and no data uploaded to
            our servers. Whether you need a quick conversion or a daily workflow utility, our tools
            are free, fast, and private.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brand-silver">
            Browse all {categoryTools.length} tools above, or{" "}
            <Link href="/" className="link-brand">
              explore our full collection
            </Link>{" "}
            of 60+ free online utilities across text, images, code, math, and productivity.
          </p>
        </section>
      </div>
    </>
  );
}
