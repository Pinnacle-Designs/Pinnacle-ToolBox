import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import TimezoneConverterTool from "@/components/tools/TimezoneConverterTool";

export function generateMetadata() {
  return generateToolMetadata("timezone-converter");
}

export default function Page() {
  return (
    <ToolLayout slug="timezone-converter">
      <TimezoneConverterTool />
    </ToolLayout>
  );
}
