interface HowToUseProps {
  steps: string[];
}

export default function HowToUse({ steps }: HowToUseProps) {
  return (
    <section className="mt-10" aria-labelledby="how-to-use-heading">
      <h2 id="how-to-use-heading" className="section-title mb-4">
        How to use
      </h2>
      <ol className="space-y-3 rounded-xl border border-brand-navy-light/35 bg-brand-navy/30 p-5">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-brand-silver">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-xs font-bold text-brand-orange ring-1 ring-brand-red/30">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
