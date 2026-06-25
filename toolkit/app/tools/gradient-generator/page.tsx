import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import GradientGeneratorTool from "@/components/tools/GradientGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("gradient-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="gradient-generator">
      <GradientGeneratorTool />
    </ToolLayout>
  );
}
