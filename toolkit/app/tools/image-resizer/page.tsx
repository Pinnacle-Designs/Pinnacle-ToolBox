import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ImageResizerTool from "@/components/tools/ImageResizerTool";

export function generateMetadata() {
  return generateToolMetadata("image-resizer");
}

export default function Page() {
  return (
    <ToolLayout slug="image-resizer">
      <ImageResizerTool />
    </ToolLayout>
  );
}
