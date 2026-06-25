import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ExifRemoverTool from "@/components/tools/ExifRemoverTool";

export function generateMetadata() {
  return generateToolMetadata("exif-remover");
}

export default function Page() {
  return (
    <ToolLayout slug="exif-remover">
      <ExifRemoverTool />
    </ToolLayout>
  );
}
