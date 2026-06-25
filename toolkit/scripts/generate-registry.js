const { writeFileSync, mkdirSync } = require("fs");
const { join } = require("path");

const tools = [
  ["word-counter", "Word Counter", "Text Tools", "Count words, characters, sentences, and reading time instantly.", "Type", ["case-converter", "readability-checker", "word-frequency", "whitespace-remover"]],
  ["case-converter", "Case Converter", "Text Tools", "Convert text between uppercase, lowercase, title case, and more.", "CaseSensitive", ["word-counter", "text-to-slug", "reverse-text", "whitespace-remover"]],
  ["duplicate-line-remover", "Duplicate Line Remover", "Text Tools", "Remove duplicate lines from text while preserving order.", "ListMinus", ["whitespace-remover", "word-counter", "text-diff-checker", "case-converter"]],
  ["text-to-slug", "Text to Slug", "Text Tools", "Convert any text into a clean, URL-safe slug.", "Link", ["case-converter", "url-encoder", "word-counter", "whitespace-remover"]],
  ["lorem-ipsum-generator", "Lorem Ipsum Generator", "Text Tools", "Generate placeholder Lorem Ipsum text for designs and mockups.", "FileText", ["word-counter", "case-converter", "text-to-slug", "readability-checker"]],
  ["text-diff-checker", "Text Diff Checker", "Text Tools", "Compare two texts side by side and highlight differences.", "GitCompare", ["duplicate-line-remover", "word-counter", "whitespace-remover", "word-frequency"]],
  ["word-frequency", "Word Frequency", "Text Tools", "Analyze word frequency with counts and percentages.", "BarChart3", ["word-counter", "readability-checker", "text-diff-checker", "case-converter"]],
  ["reverse-text", "Reverse Text", "Text Tools", "Reverse strings, words, or character order in your text.", "ArrowLeftRight", ["case-converter", "word-counter", "whitespace-remover", "text-to-slug"]],
  ["whitespace-remover", "Whitespace Remover", "Text Tools", "Clean up extra spaces, blank lines, and trim text.", "Eraser", ["duplicate-line-remover", "word-counter", "case-converter", "text-to-slug"]],
  ["readability-checker", "Readability Checker", "Text Tools", "Check Flesch reading ease, grade level, and reading time.", "BookOpen", ["word-counter", "word-frequency", "lorem-ipsum-generator", "case-converter"]],
  ["unit-converter", "Unit Converter", "Math & Conversion", "Convert length, weight, temperature, speed, and more.", "Ruler", ["percentage-calculator", "scientific-notation-converter", "fraction-to-decimal", "tip-calculator"]],
  ["percentage-calculator", "Percentage Calculator", "Math & Conversion", "Calculate percentages, ratios, and percentage change.", "Percent", ["tip-calculator", "unit-converter", "fraction-to-decimal", "scientific-notation-converter"]],
  ["fraction-to-decimal", "Fraction to Decimal", "Math & Conversion", "Convert fractions to decimals and decimals to fractions.", "Divide", ["percentage-calculator", "roman-numeral-converter", "binary-hex-converter", "number-to-words"]],
  ["roman-numeral-converter", "Roman Numeral Converter", "Math & Conversion", "Convert between integers and Roman numerals (1–3999).", "Hash", ["number-to-words", "fraction-to-decimal", "binary-hex-converter", "scientific-notation-converter"]],
  ["number-to-words", "Number to Words", "Math & Conversion", "Convert numbers to English words in US or UK style.", "Languages", ["roman-numeral-converter", "fraction-to-decimal", "binary-hex-converter", "scientific-notation-converter"]],
  ["binary-hex-converter", "Binary Hex Converter", "Math & Conversion", "Convert between binary, decimal, hexadecimal, and octal.", "Binary", ["roman-numeral-converter", "scientific-notation-converter", "hash-generator", "base64-encoder"]],
  ["age-calculator", "Age Calculator", "Math & Conversion", "Calculate exact age in years, months, days, and more.", "Cake", ["date-difference-calculator", "unix-timestamp-converter", "timezone-converter", "countdown-timer"]],
  ["date-difference-calculator", "Date Difference Calculator", "Math & Conversion", "Find the difference between two dates in days, weeks, and months.", "CalendarRange", ["age-calculator", "unix-timestamp-converter", "timezone-converter", "meeting-planner"]],
  ["tip-calculator", "Tip Calculator", "Math & Conversion", "Calculate tips and split bills among multiple people.", "Receipt", ["percentage-calculator", "unit-converter", "invoice-generator", "fraction-to-decimal"]],
  ["scientific-notation-converter", "Scientific Notation Converter", "Math & Conversion", "Convert between standard and scientific notation.", "Superscript", ["binary-hex-converter", "unit-converter", "percentage-calculator", "fraction-to-decimal"]],
  ["hex-to-rgb", "HEX to RGB", "Design & Color", "Convert colors between HEX, RGB, HSL, and HSV formats.", "Palette", ["color-picker", "contrast-checker", "tint-shade-generator", "gradient-generator"]],
  ["color-picker", "Color Picker", "Design & Color", "Pick colors and get HEX, RGB, and HSL values instantly.", "Pipette", ["hex-to-rgb", "color-palette-generator", "gradient-generator", "contrast-checker"]],
  ["color-palette-generator", "Color Palette Generator", "Design & Color", "Generate complementary, analogous, and triadic color palettes.", "SwatchBook", ["color-picker", "gradient-generator", "tint-shade-generator", "hex-to-rgb"]],
  ["gradient-generator", "Gradient Generator", "Design & Color", "Create CSS linear gradients with live preview.", "Paintbrush", ["color-picker", "color-palette-generator", "hex-to-rgb", "tint-shade-generator"]],
  ["contrast-checker", "Contrast Checker", "Design & Color", "Check WCAG color contrast ratios for accessibility.", "Eye", ["hex-to-rgb", "color-picker", "tint-shade-generator", "gradient-generator"]],
  ["tint-shade-generator", "Tint Shade Generator", "Design & Color", "Generate tints and shades from any base color.", "Layers", ["hex-to-rgb", "color-palette-generator", "contrast-checker", "color-picker"]],
  ["image-color-extractor", "Image Color Extractor", "Design & Color", "Extract dominant colors from any uploaded image.", "Image", ["color-picker", "hex-to-rgb", "color-palette-generator", "favicon-generator"]],
  ["image-resizer", "Image Resizer", "Image Tools", "Resize images to custom dimensions in your browser.", "Maximize2", ["image-compressor", "image-cropper", "image-converter", "image-to-base64"]],
  ["image-compressor", "Image Compressor", "Image Tools", "Compress images with adjustable quality settings.", "Shrink", ["image-resizer", "image-converter", "exif-remover", "image-to-base64"]],
  ["image-to-base64", "Image to Base64", "Image Tools", "Convert images to Base64 strings and data URLs.", "Code", ["base64-encoder", "image-converter", "image-compressor", "favicon-generator"]],
  ["image-converter", "Image Converter", "Image Tools", "Convert images between PNG, JPG, and WEBP formats.", "RefreshCw", ["image-resizer", "image-compressor", "image-cropper", "exif-remover"]],
  ["image-cropper", "Image Cropper", "Image Tools", "Crop images with precise x, y, width, and height controls.", "Crop", ["image-resizer", "image-converter", "favicon-generator", "image-compressor"]],
  ["exif-remover", "EXIF Remover", "Image Tools", "Strip EXIF metadata from images for privacy.", "ShieldOff", ["image-compressor", "image-converter", "image-resizer", "image-to-base64"]],
  ["favicon-generator", "Favicon Generator", "Image Tools", "Generate favicon sizes and download as a ZIP file.", "Sparkles", ["image-resizer", "image-cropper", "image-color-extractor", "image-converter"]],
  ["json-formatter", "JSON Formatter", "Developer Tools", "Format, minify, and validate JSON data.", "Braces", ["csv-to-json", "json-to-csv", "base64-encoder", "jwt-decoder"]],
  ["base64-encoder", "Base64 Encoder", "Developer Tools", "Encode and decode text and files to Base64.", "Lock", ["url-encoder", "hash-generator", "image-to-base64", "json-formatter"]],
  ["url-encoder", "URL Encoder", "Developer Tools", "Encode and decode URLs and URI components.", "Globe", ["html-entity-encoder", "base64-encoder", "url-analyzer", "text-to-slug"]],
  ["html-entity-encoder", "HTML Entity Encoder", "Developer Tools", "Encode and decode HTML entities safely.", "Code2", ["url-encoder", "markdown-to-html", "html-minifier", "base64-encoder"]],
  ["regex-tester", "Regex Tester", "Developer Tools", "Test regular expressions with live match highlighting.", "Search", ["json-formatter", "url-encoder", "jwt-decoder", "hash-generator"]],
  ["jwt-decoder", "JWT Decoder", "Developer Tools", "Decode JWT tokens and inspect header and payload.", "Key", ["base64-encoder", "hash-generator", "json-formatter", "uuid-generator"]],
  ["uuid-generator", "UUID Generator", "Developer Tools", "Generate UUID v4 identifiers in bulk.", "Fingerprint", ["password-generator", "hash-generator", "jwt-decoder", "json-formatter"]],
  ["password-generator", "Password Generator", "Developer Tools", "Generate secure random passwords with custom options.", "KeyRound", ["uuid-generator", "hash-generator", "base64-encoder", "jwt-decoder"]],
  ["hash-generator", "Hash Generator", "Developer Tools", "Generate SHA-1, SHA-256, SHA-384, SHA-512, and MD5 hashes.", "Hash", ["password-generator", "base64-encoder", "jwt-decoder", "uuid-generator"]],
  ["cron-explainer", "Cron Explainer", "Developer Tools", "Explain cron expressions and show next run times.", "Clock", ["unix-timestamp-converter", "timezone-converter", "json-formatter", "regex-tester"]],
  ["css-minifier", "CSS Minifier", "Developer Tools", "Minify CSS to reduce file size.", "Minimize2", ["html-minifier", "json-formatter", "markdown-to-html", "regex-tester"]],
  ["html-minifier", "HTML Minifier", "Developer Tools", "Minify HTML by removing whitespace and comments.", "FileCode", ["css-minifier", "markdown-to-html", "html-entity-encoder", "json-formatter"]],
  ["markdown-to-html", "Markdown to HTML", "Developer Tools", "Convert Markdown to HTML with live preview.", "FileType", ["html-minifier", "html-entity-encoder", "json-formatter", "css-minifier"]],
  ["qr-generator", "QR Generator", "QR & Code", "Create QR codes for URLs, WiFi, vCards, and more.", "QrCode", ["barcode-generator", "url-analyzer", "url-encoder", "favicon-generator"]],
  ["barcode-generator", "Barcode Generator", "QR & Code", "Generate CODE128, EAN-13, and UPC-A barcodes.", "ScanBarcode", ["qr-generator", "url-analyzer", "uuid-generator", "hash-generator"]],
  ["url-analyzer", "URL Analyzer", "QR & Code", "Analyze URL structure and check for suspicious patterns.", "Link2", ["url-encoder", "qr-generator", "jwt-decoder", "regex-tester"]],
  ["pomodoro-timer", "Pomodoro Timer", "Time & Productivity", "Focus timer with work sessions and breaks.", "Timer", ["stopwatch", "countdown-timer", "meeting-planner", "timezone-converter"]],
  ["stopwatch", "Stopwatch", "Time & Productivity", "Simple stopwatch with lap and split times.", "CircleStop", ["pomodoro-timer", "countdown-timer", "unix-timestamp-converter", "timezone-converter"]],
  ["countdown-timer", "Countdown Timer", "Time & Productivity", "Set a countdown timer with hours, minutes, and seconds.", "Hourglass", ["pomodoro-timer", "stopwatch", "age-calculator", "meeting-planner"]],
  ["timezone-converter", "Timezone Converter", "Time & Productivity", "Convert times across multiple timezones.", "Globe2", ["unix-timestamp-converter", "meeting-planner", "date-difference-calculator", "cron-explainer"]],
  ["unix-timestamp-converter", "Unix Timestamp Converter", "Time & Productivity", "Convert Unix timestamps to dates and vice versa.", "Clock3", ["timezone-converter", "date-difference-calculator", "cron-explainer", "age-calculator"]],
  ["meeting-planner", "Meeting Planner", "Time & Productivity", "Find overlapping business hours across timezones.", "Users", ["timezone-converter", "pomodoro-timer", "date-difference-calculator", "countdown-timer"]],
  ["resume-builder", "Resume Builder", "Document Tools", "Build a professional resume and download as PDF.", "FileUser", ["invoice-generator", "markdown-to-html", "lorem-ipsum-generator", "word-counter"]],
  ["invoice-generator", "Invoice Generator", "Document Tools", "Create invoices with line items and download as PDF.", "FileSpreadsheet", ["resume-builder", "tip-calculator", "csv-to-json", "percentage-calculator"]],
  ["csv-to-json", "CSV to JSON", "Document Tools", "Convert CSV data to formatted JSON.", "Table", ["json-to-csv", "json-formatter", "invoice-generator", "markdown-to-html"]],
  ["json-to-csv", "JSON to CSV", "Document Tools", "Convert JSON arrays to CSV format.", "Sheet", ["csv-to-json", "json-formatter", "invoice-generator", "resume-builder"]],
];

const iconImports = [...new Set(tools.map((t) => t[4]))].sort().join(", ");

let out = 'import {\n  ' + iconImports + ',\n} from "lucide-react";\n';
out += 'import type { Tool, ToolCategory } from "./types";\n';
out += 'import { SITE_NAME } from "./utils";\n\n';
out += 'function makeMetaDesc(description: string, name: string): string {\n';
out += '  const base = description + " Free online " + name.toLowerCase() + " tool — fast, private, no login. Runs in your browser.";\n';
out += '  return base.length <= 160 ? base : base.slice(0, 157) + "...";\n}\n\n';
out += 'function makeFaqs(name: string) {\n';
out += '  return [\n';
out += '    { question: `Is the ${name} free to use?`, answer: `Yes, ${name} is completely free with no login required. All processing happens in your browser.` },\n';
out += '    { question: `Does ${name} store my data?`, answer: "No. Pinnacle Toolbox runs entirely client-side. Your data never leaves your device unless you choose to download or copy it." },\n';
out += '    { question: `Can I use ${name} on mobile?`, answer: "Yes. All tools are mobile-responsive and work in modern mobile browsers." },\n';
out += '    { question: "Do I need to create an account?", answer: "No account is needed. Just open the tool and start using it immediately." },\n';
out += '    { question: "Is my data secure?", answer: "Your data is processed locally in your browser. We do not send your input to any server." },\n';
out += '  ];\n}\n\n';
out += 'function makeHowTo(name: string): string[] {\n';
out += '  return [\n';
out += '    `Open the ${name} tool on Pinnacle Toolbox.`,\n';
out += '    "Enter or upload your input in the tool interface.",\n';
out += '    "Adjust any available options to customize the output.",\n';
out += '    "Review the results displayed instantly on screen.",\n';
out += '    "Copy or download the output as needed.",\n';
out += '  ];\n}\n\n';
out += 'function mk(slug: string, name: string, category: ToolCategory, description: string, icon: Tool["icon"], relatedTools: string[]): Tool {\n';
out += '  return { slug, name, category, description, icon, relatedTools, metaTitle: `${name} — Free Online Tool | ${SITE_NAME}`, metaDescription: makeMetaDesc(description, name), faqs: makeFaqs(name), howToUse: makeHowTo(name) };\n}\n\n';
out += 'export const tools: Tool[] = [\n';

for (const [slug, name, category, description, icon, related] of tools) {
  out += `  mk("${slug}", "${name}", "${category}", "${description.replace(/"/g, '\\"')}", ${icon}, [${related.map((r) => `"${r}"`).join(", ")}]),\n`;
}

out += '];\n\n';
out += 'export function getToolBySlug(slug: string): Tool | undefined { return tools.find((t) => t.slug === slug); }\n';
out += 'export function getToolsByCategory(category: ToolCategory): Tool[] { return tools.filter((t) => t.category === category); }\n';
out += 'export function getAllCategories(): ToolCategory[] { return [...new Set(tools.map((t) => t.category))]; }\n';
out += 'export function getToolCount(): number { return tools.length; }\n';
out += 'export function searchTools(query: string): Tool[] {\n';
out += '  const q = query.toLowerCase().trim();\n';
out += '  if (!q) return tools;\n';
out += '  return tools.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.slug.includes(q));\n';
out += '}\n';

writeFileSync(join(__dirname, "..", "lib", "tools.ts"), out);

const appTools = join(__dirname, "..", "app", "tools");
const componentsTools = join(__dirname, "..", "components", "tools");
mkdirSync(componentsTools, { recursive: true });

function toPascal(slug) {
  return slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

for (const [slug] of tools) {
  const dir = join(appTools, slug);
  mkdirSync(dir, { recursive: true });
  const pascal = toPascal(slug);
  writeFileSync(join(dir, "page.tsx"), `import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ${pascal}Tool from "@/components/tools/${pascal}Tool";

export function generateMetadata() {
  return generateToolMetadata("${slug}");
}

export default function Page() {
  return (
    <ToolLayout slug="${slug}">
      <${pascal}Tool />
    </ToolLayout>
  );
}
`);
}

console.log("Generated " + tools.length + " tools.");
