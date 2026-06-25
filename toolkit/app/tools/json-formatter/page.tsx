import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import JsonFormatterTool from "@/components/tools/JsonFormatterTool";

export function generateMetadata() {
  return generateToolMetadata("json-formatter");
}

export default function Page() {
  return (
    <ToolLayout slug="json-formatter">
      <JsonFormatterTool />
    </ToolLayout>
  );
}
