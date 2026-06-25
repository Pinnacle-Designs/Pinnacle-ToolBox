import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import UnitConverterTool from "@/components/tools/UnitConverterTool";

export function generateMetadata() {
  return generateToolMetadata("unit-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="unit-converter">
      <UnitConverterTool />
    </ToolLayout>
  );
}
