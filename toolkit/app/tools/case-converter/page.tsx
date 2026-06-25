import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import CaseConverterTool from "@/components/tools/CaseConverterTool";

export function generateMetadata() {
  return generateToolMetadata("case-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="case-converter">
      <CaseConverterTool />
    </ToolLayout>
  );
}
