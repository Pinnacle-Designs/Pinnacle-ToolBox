import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ScientificNotationConverterTool from "@/components/tools/ScientificNotationConverterTool";

export function generateMetadata() {
  return generateToolMetadata("scientific-notation-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="scientific-notation-converter">
      <ScientificNotationConverterTool />
    </ToolLayout>
  );
}
