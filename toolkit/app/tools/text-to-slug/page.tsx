import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import TextToSlugTool from "@/components/tools/TextToSlugTool";

export function generateMetadata() {
  return generateToolMetadata("text-to-slug");
}

export default function Page() {
  return (
    <ToolLayout slug="text-to-slug">
      <TextToSlugTool />
    </ToolLayout>
  );
}
