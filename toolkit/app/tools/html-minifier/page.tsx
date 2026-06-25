import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import HtmlMinifierTool from "@/components/tools/HtmlMinifierTool";

export function generateMetadata() {
  return generateToolMetadata("html-minifier");
}

export default function Page() {
  return (
    <ToolLayout slug="html-minifier">
      <HtmlMinifierTool />
    </ToolLayout>
  );
}
