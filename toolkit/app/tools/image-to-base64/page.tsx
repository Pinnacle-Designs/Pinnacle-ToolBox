import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ImageToBase64Tool from "@/components/tools/ImageToBase64Tool";

export function generateMetadata() {
  return generateToolMetadata("image-to-base64");
}

export default function Page() {
  return (
    <ToolLayout slug="image-to-base64">
      <ImageToBase64Tool />
    </ToolLayout>
  );
}
