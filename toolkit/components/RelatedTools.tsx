import Link from "next/link";
import { getToolBySlug } from "@/lib/tools";

interface RelatedToolsProps {
  slugs: string[];
}

export default function RelatedTools({ slugs }: RelatedToolsProps) {
  const related = slugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="section-title mb-4">
        Related tools
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="flex items-start gap-3 rounded-xl border border-brand-navy-light/35 bg-brand-navy/40 p-4 transition hover:border-brand-blue/50 hover:bg-brand-navy-light/30"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/20">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div>
                <h3 className="font-medium text-brand-white">{tool.name}</h3>
                <p className="text-sm text-brand-silver-muted line-clamp-2">{tool.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
