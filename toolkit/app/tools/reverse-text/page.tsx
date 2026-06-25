import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ReverseTextTool from "@/components/tools/ReverseTextTool";

export function generateMetadata() {
  return generateToolMetadata("reverse-text");
}

export default function Page() {
  return (
    <ToolLayout slug="reverse-text">
      <ReverseTextTool />
    </ToolLayout>
  );
}
