import type { Metadata } from "next";
import { getToolBySlug } from "./tools";
import type { Tool } from "./types";
import { SITE_NAME, SITE_URL } from "./utils";

export function generateToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { title: `Tool Not Found | ${SITE_NAME}` };
  }
  const title = tool.metaTitle;
  const description = tool.metaDescription;
  const url = `${SITE_URL}/tools/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
    },
  };
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: "website",
      url,
      siteName: SITE_NAME,
    },
  };
}

export function generateSoftwareApplicationJsonLd(tool: Tool): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${SITE_URL}/tools/${tool.slug}`,
  };
  return JSON.stringify(jsonLd);
}
