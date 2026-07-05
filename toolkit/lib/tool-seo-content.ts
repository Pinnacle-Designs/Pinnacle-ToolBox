import type { Tool, ToolCategory } from "./types";
import { getCategorySeo } from "./category-seo";
import { SITE_NAME } from "./utils";

export interface ToolSeoContent {
  aboutHeading: string;
  aboutParagraphs: string[];
  featuresHeading: string;
  features: string[];
  useCasesHeading: string;
  useCases: string[];
}

const CATEGORY_USE_CASES: Record<ToolCategory, string[]> = {
  "Text Tools": [
    "Editing blog posts, essays, and articles before publishing",
    "Cleaning up copied text from PDFs or web pages",
    "Preparing content for SEO with slug and word count analysis",
    "Comparing document revisions during editing workflows",
  ],
  "Math & Conversion": [
    "Converting measurements for recipes, travel, or engineering",
    "Calculating tips and splitting restaurant bills",
    "Working with binary, hex, and decimal in programming",
    "Determining exact age or date differences for forms",
  ],
  "Design & Color": [
    "Picking brand colors and building accessible palettes",
    "Converting color formats for CSS and design tools",
    "Checking text contrast for WCAG accessibility compliance",
    "Generating CSS gradients for websites and apps",
  ],
  "Image Tools": [
    "Optimizing images before uploading to websites",
    "Removing EXIF location data for privacy before sharing",
    "Creating favicons for new web projects",
    "Converting image formats without desktop software",
  ],
  "Developer Tools": [
    "Debugging and formatting JSON API responses",
    "Encoding credentials or tokens for testing",
    "Generating secure passwords and UUIDs for development",
    "Minifying HTML and CSS before deployment",
  ],
  "QR & Code": [
    "Creating QR codes for marketing materials and menus",
    "Generating WiFi QR codes for guest access",
    "Making product barcodes for inventory systems",
    "Analyzing suspicious URLs before clicking",
  ],
  "Time & Productivity": [
    "Running focused Pomodoro work sessions",
    "Scheduling meetings across remote team timezones",
    "Converting Unix timestamps from server logs",
    "Setting countdown timers for presentations or cooking",
  ],
  "Document Tools": [
    "Building a resume for job applications",
    "Creating invoices for freelance clients",
    "Converting spreadsheet data to JSON for APIs",
    "Migrating JSON data to CSV for Excel",
  ],
};

/** Tool-specific search terms and feature highlights for high-traffic tools. */
const TOOL_OVERRIDES: Partial<
  Record<
    string,
    { searchTerms?: string[]; extraFeatures?: string[]; extraUseCases?: string[] }
  >
> = {
  "word-counter": {
    searchTerms: ["character counter", "word count tool", "reading time calculator"],
    extraFeatures: [
      "Counts words, characters, sentences, and paragraphs",
      "Estimates reading time for blog posts and articles",
    ],
  },
  "json-formatter": {
    searchTerms: ["json beautifier", "json validator", "json prettifier"],
    extraFeatures: [
      "Beautify and minify JSON with syntax validation",
      "Highlights parse errors with line numbers",
    ],
  },
  "qr-generator": {
    searchTerms: ["qr code maker", "free qr code", "wifi qr code"],
    extraFeatures: [
      "Generate QR codes for URLs, plain text, WiFi, and vCards",
      "Download as PNG with adjustable size",
    ],
  },
  "password-generator": {
    searchTerms: ["random password generator", "strong password maker"],
    extraFeatures: [
      "Customizable length and character sets",
      "Generates cryptographically random passwords",
    ],
  },
  "base64-encoder": {
    searchTerms: ["base64 decode", "base64 encode online"],
    extraFeatures: ["Encode and decode text and files to Base64", "Supports UTF-8 text"],
  },
  "image-compressor": {
    searchTerms: ["compress jpg online", "reduce image file size"],
    extraFeatures: ["Adjustable quality slider for size vs. quality balance"],
  },
  "unit-converter": {
    searchTerms: ["metric converter", "length weight temperature converter"],
    extraFeatures: ["Length, weight, temperature, speed, and volume units"],
  },
  "hex-to-rgb": {
    searchTerms: ["color converter", "rgb to hex", "hsl converter"],
    extraFeatures: ["Convert HEX, RGB, HSL, and HSV in one tool"],
  },
};

function toolSearchPhrase(tool: Tool): string {
  const override = TOOL_OVERRIDES[tool.slug];
  if (override?.searchTerms?.length) {
    return override.searchTerms.join(", ");
  }
  return tool.slug.replace(/-/g, " ");
}

export function getToolSeoContent(tool: Tool): ToolSeoContent {
  const categorySeo = getCategorySeo(tool.category);
  const override = TOOL_OVERRIDES[tool.slug];
  const searchPhrase = toolSearchPhrase(tool);

  const aboutParagraphs = [
    `Our free ${tool.name.toLowerCase()} lets you ${tool.description.charAt(0).toLowerCase()}${tool.description.slice(1)} Everything runs locally in your browser — no account, no upload to servers, and no waiting.`,
    `Whether you searched for "${searchPhrase}" or need a reliable ${tool.category.toLowerCase().replace(/ tools$/i, "")} utility, ${SITE_NAME} delivers instant results. Join thousands of users who prefer privacy-first tools that work on any device.`,
    `Part of our ${categorySeo.title.toLowerCase()} collection, this tool is designed for speed and simplicity. Open it, paste or upload your input, and get results immediately.`,
  ];

  const baseFeatures = [
    "100% free with no hidden limits",
    "Runs entirely in your browser — data stays private",
    "No login, sign-up, or email required",
    "Works on desktop, tablet, and mobile",
    "Instant processing with no server round-trip",
  ];

  const features = override?.extraFeatures
    ? [...override.extraFeatures, ...baseFeatures.slice(0, 3)]
    : baseFeatures;

  const categoryUseCases = CATEGORY_USE_CASES[tool.category];
  const useCases = override?.extraUseCases
    ? [...override.extraUseCases, ...categoryUseCases.slice(0, 2)]
    : categoryUseCases;

  return {
    aboutHeading: `About the Free ${tool.name}`,
    aboutParagraphs,
    featuresHeading: `${tool.name} Features`,
    features,
    useCasesHeading: `When to Use ${tool.name}`,
    useCases,
  };
}
