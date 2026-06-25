import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import UrlEncoderTool from "@/components/tools/UrlEncoderTool";

export function generateMetadata() {
  return generateToolMetadata("url-encoder");
}

export default function Page() {
  return (
    <ToolLayout slug="url-encoder">
      <UrlEncoderTool />
    </ToolLayout>
  );
}
