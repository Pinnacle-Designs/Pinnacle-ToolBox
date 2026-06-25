import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import HashGeneratorTool from "@/components/tools/HashGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("hash-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="hash-generator">
      <HashGeneratorTool />
    </ToolLayout>
  );
}
