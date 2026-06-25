import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import FaviconGeneratorTool from "@/components/tools/FaviconGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("favicon-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="favicon-generator">
      <FaviconGeneratorTool />
    </ToolLayout>
  );
}
