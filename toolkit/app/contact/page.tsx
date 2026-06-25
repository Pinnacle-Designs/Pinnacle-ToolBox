import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "Contact",
  "Contact Pinnacle Toolbox. Get in touch with questions, feedback, or suggestions.",
  "/contact"
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="surface-card p-8">
        <h1 className="text-3xl font-bold text-brand-white">Contact Us</h1>
        <p className="mt-4 text-brand-silver">
          Have a question, suggestion, or feedback? We&apos;d love to hear from you.
        </p>

        <div className="mt-6 rounded-xl border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm text-brand-yellow">
          Contact form backend coming soon. For now, replace this with your email or form provider.
        </div>

        <form className="mt-8 space-y-6" action="#" method="post">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-silver">Name</label>
            <input id="name" name="name" type="text" className="input-brand" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-silver">Email</label>
            <input id="email" name="email" type="email" className="input-brand" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-silver">Message</label>
            <textarea id="message" name="message" rows={5} className="input-brand" />
          </div>
          <button type="submit" className="btn-primary px-6">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
