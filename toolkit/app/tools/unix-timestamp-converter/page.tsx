import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import UnixTimestampConverterTool from "@/components/tools/UnixTimestampConverterTool";

export function generateMetadata() {
  return generateToolMetadata("unix-timestamp-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="unix-timestamp-converter">
      <UnixTimestampConverterTool />
    </ToolLayout>
  );
}
