import type { LucideIcon } from "lucide-react";

export type ToolCategory =
  | "Text Tools"
  | "Math & Conversion"
  | "Design & Color"
  | "Image Tools"
  | "Developer Tools"
  | "QR & Code"
  | "Time & Productivity"
  | "Document Tools";

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface Tool {
  slug: string;
  name: string;
  category: ToolCategory;
  description: string;
  icon: LucideIcon;
  relatedTools: string[];
  metaTitle: string;
  metaDescription: string;
  faqs: ToolFAQ[];
  howToUse: string[];
}

export const CATEGORY_ORDER: ToolCategory[] = [
  "Text Tools",
  "Math & Conversion",
  "Design & Color",
  "Image Tools",
  "Developer Tools",
  "QR & Code",
  "Time & Productivity",
  "Document Tools",
];
