import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import CsvToJsonTool from "@/components/tools/CsvToJsonTool";

export function generateMetadata() {
  return generateToolMetadata("csv-to-json");
}

export default function Page() {
  return (
    <ToolLayout slug="csv-to-json">
      <CsvToJsonTool />
    </ToolLayout>
  );
}
