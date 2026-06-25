import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";

export function generateMetadata() {
  return generateToolMetadata("image-compressor");
}

export default function Page() {
  return (
    <ToolLayout slug="image-compressor">
      <ImageCompressorTool />
    </ToolLayout>
  );
}
