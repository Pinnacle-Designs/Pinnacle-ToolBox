import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import FractionToDecimalTool from "@/components/tools/FractionToDecimalTool";

export function generateMetadata() {
  return generateToolMetadata("fraction-to-decimal");
}

export default function Page() {
  return (
    <ToolLayout slug="fraction-to-decimal">
      <FractionToDecimalTool />
    </ToolLayout>
  );
}
