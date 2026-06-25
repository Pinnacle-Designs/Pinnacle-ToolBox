import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import TintShadeGeneratorTool from "@/components/tools/TintShadeGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("tint-shade-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="tint-shade-generator">
      <TintShadeGeneratorTool />
    </ToolLayout>
  );
}
