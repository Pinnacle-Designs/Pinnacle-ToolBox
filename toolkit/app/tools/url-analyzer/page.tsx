import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import UrlAnalyzerTool from "@/components/tools/UrlAnalyzerTool";

export function generateMetadata() {
  return generateToolMetadata("url-analyzer");
}

export default function Page() {
  return (
    <ToolLayout slug="url-analyzer">
      <UrlAnalyzerTool />
    </ToolLayout>
  );
}
