import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import JsonToCsvTool from "@/components/tools/JsonToCsvTool";

export function generateMetadata() {
  return generateToolMetadata("json-to-csv");
}

export default function Page() {
  return (
    <ToolLayout slug="json-to-csv">
      <JsonToCsvTool />
    </ToolLayout>
  );
}
