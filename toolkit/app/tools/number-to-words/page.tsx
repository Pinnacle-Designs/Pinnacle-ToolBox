import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import NumberToWordsTool from "@/components/tools/NumberToWordsTool";

export function generateMetadata() {
  return generateToolMetadata("number-to-words");
}

export default function Page() {
  return (
    <ToolLayout slug="number-to-words">
      <NumberToWordsTool />
    </ToolLayout>
  );
}
