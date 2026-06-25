import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import QrGeneratorTool from "@/components/tools/QrGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("qr-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="qr-generator">
      <QrGeneratorTool />
    </ToolLayout>
  );
}
