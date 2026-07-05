import { ChevronDown } from "lucide-react";
import type { ToolFAQ } from "@/lib/types";

interface FAQProps {
  items: ToolFAQ[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section className="mt-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="section-title mb-4">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-brand-navy-light/30 overflow-hidden rounded-xl border border-brand-navy-light/40 bg-brand-navy/50">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 font-medium text-brand-white transition hover:bg-brand-navy-light/30 [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-brand-silver transition group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="px-4 pb-4 text-sm leading-relaxed text-brand-silver">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
