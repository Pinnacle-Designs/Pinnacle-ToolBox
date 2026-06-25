import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import BinaryHexConverterTool from "@/components/tools/BinaryHexConverterTool";

export function generateMetadata() {
  return generateToolMetadata("binary-hex-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="binary-hex-converter">
      <BinaryHexConverterTool />
    </ToolLayout>
  );
}
