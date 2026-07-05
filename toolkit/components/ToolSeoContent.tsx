import type { Tool } from "@/lib/types";
import { getToolSeoContent } from "@/lib/tool-seo-content";

interface ToolSeoContentProps {
  tool: Tool;
}

export default function ToolSeoContent({ tool }: ToolSeoContentProps) {
  const content = getToolSeoContent(tool);

  return (
    <article className="mt-10 space-y-10 border-t border-brand-navy-light/30 pt-10">
      <section aria-labelledby="about-tool-heading">
        <h2 id="about-tool-heading" className="section-title mb-4">
          {content.aboutHeading}
        </h2>
        {content.aboutParagraphs.map((paragraph, i) => (
          <p key={i} className="mb-3 text-sm leading-relaxed text-brand-silver last:mb-0">
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="section-title mb-4">
          {content.featuresHeading}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {content.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm leading-relaxed text-brand-silver"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="section-title mb-4">
          {content.useCasesHeading}
        </h2>
        <ul className="space-y-2">
          {content.useCases.map((useCase) => (
            <li
              key={useCase}
              className="rounded-lg border border-brand-navy-light/30 bg-brand-navy/25 px-4 py-3 text-sm leading-relaxed text-brand-silver"
            >
              {useCase}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
