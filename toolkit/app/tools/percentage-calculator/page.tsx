import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import PercentageCalculatorTool from "@/components/tools/PercentageCalculatorTool";

export function generateMetadata() {
  return generateToolMetadata("percentage-calculator");
}

export default function Page() {
  return (
    <ToolLayout slug="percentage-calculator">
      <PercentageCalculatorTool />
    </ToolLayout>
  );
}
