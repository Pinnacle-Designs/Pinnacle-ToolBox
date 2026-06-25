import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import HtmlEntityEncoderTool from "@/components/tools/HtmlEntityEncoderTool";

export function generateMetadata() {
  return generateToolMetadata("html-entity-encoder");
}

export default function Page() {
  return (
    <ToolLayout slug="html-entity-encoder">
      <HtmlEntityEncoderTool />
    </ToolLayout>
  );
}
