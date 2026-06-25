import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import UuidGeneratorTool from "@/components/tools/UuidGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("uuid-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="uuid-generator">
      <UuidGeneratorTool />
    </ToolLayout>
  );
}
