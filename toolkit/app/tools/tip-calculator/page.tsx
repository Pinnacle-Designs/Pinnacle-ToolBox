import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import TipCalculatorTool from "@/components/tools/TipCalculatorTool";

export function generateMetadata() {
  return generateToolMetadata("tip-calculator");
}

export default function Page() {
  return (
    <ToolLayout slug="tip-calculator">
      <TipCalculatorTool />
    </ToolLayout>
  );
}
