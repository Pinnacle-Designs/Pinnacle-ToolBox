import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ImageConverterTool from "@/components/tools/ImageConverterTool";

export function generateMetadata() {
  return generateToolMetadata("image-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="image-converter">
      <ImageConverterTool />
    </ToolLayout>
  );
}
