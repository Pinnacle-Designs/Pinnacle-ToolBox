import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import DateDifferenceCalculatorTool from "@/components/tools/DateDifferenceCalculatorTool";

export function generateMetadata() {
  return generateToolMetadata("date-difference-calculator");
}

export default function Page() {
  return (
    <ToolLayout slug="date-difference-calculator">
      <DateDifferenceCalculatorTool />
    </ToolLayout>
  );
}
