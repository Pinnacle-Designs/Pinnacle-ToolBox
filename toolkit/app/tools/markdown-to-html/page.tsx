import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import MarkdownToHtmlTool from "@/components/tools/MarkdownToHtmlTool";

export function generateMetadata() {
  return generateToolMetadata("markdown-to-html");
}

export default function Page() {
  return (
    <ToolLayout slug="markdown-to-html">
      <MarkdownToHtmlTool />
    </ToolLayout>
  );
}
