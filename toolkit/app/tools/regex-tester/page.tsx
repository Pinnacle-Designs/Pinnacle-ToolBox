import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import RegexTesterTool from "@/components/tools/RegexTesterTool";

export function generateMetadata() {
  return generateToolMetadata("regex-tester");
}

export default function Page() {
  return (
    <ToolLayout slug="regex-tester">
      <RegexTesterTool />
    </ToolLayout>
  );
}
