import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import RomanNumeralConverterTool from "@/components/tools/RomanNumeralConverterTool";

export function generateMetadata() {
  return generateToolMetadata("roman-numeral-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="roman-numeral-converter">
      <RomanNumeralConverterTool />
    </ToolLayout>
  );
}
