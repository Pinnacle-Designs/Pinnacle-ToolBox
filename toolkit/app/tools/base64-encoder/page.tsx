import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import Base64EncoderTool from "@/components/tools/Base64EncoderTool";

export function generateMetadata() {
  return generateToolMetadata("base64-encoder");
}

export default function Page() {
  return (
    <ToolLayout slug="base64-encoder">
      <Base64EncoderTool />
    </ToolLayout>
  );
}
