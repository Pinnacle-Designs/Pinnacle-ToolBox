interface ToolAboutProps {
  name: string;
  content: string;
}

export default function ToolAbout({ name, content }: ToolAboutProps) {
  return (
    <section className="mt-10" aria-labelledby="about-tool-heading">
      <h2 id="about-tool-heading" className="section-title mb-4">
        About this {name}
      </h2>
      <div className="space-y-4 rounded-xl border border-brand-navy-light/35 bg-brand-navy/30 p-5 text-sm leading-relaxed text-brand-silver">
        {content.split(/\n\n+/).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
