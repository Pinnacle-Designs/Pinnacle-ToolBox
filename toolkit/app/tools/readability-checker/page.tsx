import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ReadabilityCheckerTool from "@/components/tools/ReadabilityCheckerTool";

export function generateMetadata() {
  return generateToolMetadata("readability-checker");
}

export default function Page() {
  return (
    <ToolLayout slug="readability-checker">
      <ReadabilityCheckerTool />
    </ToolLayout>
  );
}
