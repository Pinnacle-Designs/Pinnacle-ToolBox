"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolFAQ } from "@/lib/types";

interface FAQProps {
  items: ToolFAQ[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="section-title mb-4">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-brand-navy-light/30 overflow-hidden rounded-xl border border-brand-navy-light/40 bg-brand-navy/50">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                type="button"
                id={`faq-button-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-4 py-4 text-left font-medium text-brand-white transition hover:bg-brand-navy-light/30"
              >
                {item.question}
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-brand-silver transition", isOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                hidden={!isOpen}
                className="px-4 pb-4 text-sm leading-relaxed text-brand-silver"
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
