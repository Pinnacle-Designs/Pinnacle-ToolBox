import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ContrastCheckerTool from "@/components/tools/ContrastCheckerTool";

export function generateMetadata() {
  return generateToolMetadata("contrast-checker");
}

export default function Page() {
  return (
    <ToolLayout slug="contrast-checker">
      <ContrastCheckerTool />
    </ToolLayout>
  );
}
