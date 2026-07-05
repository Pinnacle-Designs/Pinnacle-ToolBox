import type { ToolCategory } from "./types";
import { categorySlug } from "./utils";

export interface CategorySeo {
  category: ToolCategory;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  benefits: string[];
}

const CATEGORY_SEO: Record<ToolCategory, Omit<CategorySeo, "category" | "slug">> = {
  "Text Tools": {
    title: "Free Text Tools Online",
    metaTitle: "Free Text Tools Online — Word Counter, Case Converter & More",
    metaDescription:
      "60+ free text tools online: word counter, case converter, diff checker, slug generator, and more. No login — runs in your browser, private and instant.",
    keywords: [
      "free text tools online",
      "online text utilities",
      "word counter free",
      "case converter online",
      "text diff checker",
      "text to slug generator",
      "duplicate line remover",
    ],
    intro:
      "Process, analyze, and transform text instantly with our free online text tools. From counting words and converting case to comparing documents and generating slugs — every tool runs in your browser with no sign-up required.",
    benefits: [
      "Instant results with no server upload",
      "Works on desktop and mobile browsers",
      "No account or subscription needed",
      "Your text stays private on your device",
    ],
  },
  "Math & Conversion": {
    title: "Free Math & Conversion Tools",
    metaTitle: "Free Unit Converter, Percentage Calculator & Math Tools Online",
    metaDescription:
      "Free online unit converter, percentage calculator, fraction converter, age calculator, and more. Accurate math tools that run in your browser — no login required.",
    keywords: [
      "unit converter online free",
      "percentage calculator",
      "fraction to decimal converter",
      "age calculator online",
      "tip calculator free",
      "binary hex converter",
    ],
    intro:
      "Convert units, calculate percentages, and solve everyday math problems with free browser-based tools. Whether you need a unit converter, tip calculator, or binary-to-hex conversion, get accurate results instantly.",
    benefits: [
      "Supports length, weight, temperature, and more",
      "Precise calculations in real time",
      "No app download or registration",
      "Free for unlimited use",
    ],
  },
  "Design & Color": {
    title: "Free Design & Color Tools",
    metaTitle: "Free Color Picker, HEX to RGB Converter & Palette Generator",
    metaDescription:
      "Free design tools online: color picker, HEX to RGB converter, palette generator, gradient maker, and WCAG contrast checker. Browser-based, no login.",
    keywords: [
      "hex to rgb converter",
      "color picker online free",
      "color palette generator",
      "css gradient generator",
      "wcag contrast checker",
      "color tint shade generator",
    ],
    intro:
      "Pick colors, build palettes, check accessibility contrast, and generate CSS gradients — all free and in your browser. Perfect for designers, developers, and anyone working with color.",
    benefits: [
      "Convert between HEX, RGB, HSL, and HSV",
      "Generate harmonious color palettes",
      "Check WCAG AA and AAA contrast ratios",
      "Export CSS-ready gradient code",
    ],
  },
  "Image Tools": {
    title: "Free Image Tools Online",
    metaTitle: "Free Image Resizer, Compressor & Converter Online",
    metaDescription:
      "Resize, compress, convert, and crop images online for free. EXIF remover, favicon generator, and image-to-Base64 — all in your browser, no upload to servers.",
    keywords: [
      "image resizer online free",
      "compress image online",
      "convert png to jpg",
      "exif remover online",
      "favicon generator free",
      "image to base64 converter",
    ],
    intro:
      "Edit and optimize images without installing software. Resize, compress, convert formats, crop, strip EXIF metadata, and generate favicons — all processed locally in your browser for maximum privacy.",
    benefits: [
      "Files never leave your device",
      "Supports PNG, JPG, and WEBP",
      "Adjustable compression quality",
      "Batch-friendly favicon generation",
    ],
  },
  "Developer Tools": {
    title: "Free Developer Tools Online",
    metaTitle: "Free JSON Formatter, Base64 Encoder & Developer Utilities",
    metaDescription:
      "Free developer tools: JSON formatter, Base64 encoder, JWT decoder, regex tester, hash generator, UUID generator, and more. Browser-based, no login.",
    keywords: [
      "json formatter online free",
      "base64 encode decode",
      "jwt decoder online",
      "regex tester online",
      "hash generator sha256",
      "uuid generator v4",
      "password generator secure",
    ],
    intro:
      "Format JSON, encode Base64, decode JWTs, test regex patterns, and generate hashes — essential developer utilities that run entirely in your browser. No API keys, no server-side processing.",
    benefits: [
      "Validate and beautify JSON instantly",
      "Decode JWT headers and payloads",
      "Generate secure passwords and UUIDs",
      "Minify HTML and CSS for production",
    ],
  },
  "QR & Code": {
    title: "Free QR & Barcode Tools",
    metaTitle: "Free QR Code Generator & Barcode Maker Online",
    metaDescription:
      "Create QR codes for URLs, WiFi, and vCards. Generate CODE128, EAN-13, and UPC-A barcodes free online. Download instantly — no login required.",
    keywords: [
      "qr code generator free",
      "wifi qr code generator",
      "barcode generator online",
      "url qr code maker",
      "vcard qr code generator",
    ],
    intro:
      "Generate QR codes and barcodes for URLs, WiFi networks, contact cards, and products. Customize output and download instantly — no watermarks, no account needed.",
    benefits: [
      "Multiple QR code types supported",
      "CODE128, EAN-13, and UPC-A barcodes",
      "Instant preview and download",
      "URL analyzer for link safety checks",
    ],
  },
  "Time & Productivity": {
    title: "Free Time & Productivity Tools",
    metaTitle: "Free Pomodoro Timer, Timezone Converter & Productivity Tools",
    metaDescription:
      "Free productivity tools: Pomodoro timer, stopwatch, countdown timer, timezone converter, and meeting planner. Browser-based — no login or download.",
    keywords: [
      "pomodoro timer online free",
      "timezone converter online",
      "unix timestamp converter",
      "countdown timer online",
      "meeting planner timezones",
    ],
    intro:
      "Stay focused and manage time across zones with free productivity tools. Use a Pomodoro timer for deep work, convert Unix timestamps, plan meetings across timezones, and more.",
    benefits: [
      "Pomodoro sessions with break reminders",
      "Convert times across global timezones",
      "Unix timestamp to date conversion",
      "Find overlapping meeting hours",
    ],
  },
  "Document Tools": {
    title: "Free Document Tools Online",
    metaTitle: "Free Resume Builder, Invoice Generator & CSV to JSON Converter",
    metaDescription:
      "Build resumes and invoices as PDF, convert CSV to JSON and back. Free document tools online — no login, runs in your browser.",
    keywords: [
      "resume builder online free pdf",
      "invoice generator free",
      "csv to json converter",
      "json to csv converter online",
    ],
    intro:
      "Create professional resumes and invoices, then download as PDF. Convert between CSV and JSON formats for data workflows — all free and browser-based.",
    benefits: [
      "Download resumes and invoices as PDF",
      "CSV to JSON and JSON to CSV conversion",
      "No template watermarks",
      "Data stays on your device",
    ],
  },
};

export function getCategorySeo(category: ToolCategory): CategorySeo {
  const data = CATEGORY_SEO[category];
  return {
    category,
    slug: categorySlug(category),
    ...data,
  };
}

export function getAllCategorySeo(): CategorySeo[] {
  return (Object.keys(CATEGORY_SEO) as ToolCategory[]).map(getCategorySeo);
}

export function getCategoryBySlug(slug: string): CategorySeo | undefined {
  return getAllCategorySeo().find((c) => c.slug === slug);
}
