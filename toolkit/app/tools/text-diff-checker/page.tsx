import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import TextDiffCheckerTool from "@/components/tools/TextDiffCheckerTool";

export function generateMetadata() {
  return generateToolMetadata("text-diff-checker");
}

export default function Page() {
  return (
    <ToolLayout slug="text-diff-checker">
      <TextDiffCheckerTool />
    </ToolLayout>
  );
}
