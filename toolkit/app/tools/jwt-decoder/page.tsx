import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import JwtDecoderTool from "@/components/tools/JwtDecoderTool";

export function generateMetadata() {
  return generateToolMetadata("jwt-decoder");
}

export default function Page() {
  return (
    <ToolLayout slug="jwt-decoder">
      <JwtDecoderTool />
    </ToolLayout>
  );
}
