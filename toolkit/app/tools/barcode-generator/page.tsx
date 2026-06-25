import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import BarcodeGeneratorTool from "@/components/tools/BarcodeGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("barcode-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="barcode-generator">
      <BarcodeGeneratorTool />
    </ToolLayout>
  );
}
