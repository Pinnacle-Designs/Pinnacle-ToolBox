import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import AgeCalculatorTool from "@/components/tools/AgeCalculatorTool";

export function generateMetadata() {
  return generateToolMetadata("age-calculator");
}

export default function Page() {
  return (
    <ToolLayout slug="age-calculator">
      <AgeCalculatorTool />
    </ToolLayout>
  );
}
