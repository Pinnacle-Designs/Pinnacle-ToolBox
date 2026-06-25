import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ImageCropperTool from "@/components/tools/ImageCropperTool";

export function generateMetadata() {
  return generateToolMetadata("image-cropper");
}

export default function Page() {
  return (
    <ToolLayout slug="image-cropper">
      <ImageCropperTool />
    </ToolLayout>
  );
}
