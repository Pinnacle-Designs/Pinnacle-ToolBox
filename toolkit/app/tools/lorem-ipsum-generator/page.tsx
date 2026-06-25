import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import LoremIpsumGeneratorTool from "@/components/tools/LoremIpsumGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("lorem-ipsum-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="lorem-ipsum-generator">
      <LoremIpsumGeneratorTool />
    </ToolLayout>
  );
}
