import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ImageColorExtractorTool from "@/components/tools/ImageColorExtractorTool";

export function generateMetadata() {
  return generateToolMetadata("image-color-extractor");
}

export default function Page() {
  return (
    <ToolLayout slug="image-color-extractor">
      <ImageColorExtractorTool />
    </ToolLayout>
  );
}
