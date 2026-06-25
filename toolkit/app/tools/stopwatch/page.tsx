import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import StopwatchTool from "@/components/tools/StopwatchTool";

export function generateMetadata() {
  return generateToolMetadata("stopwatch");
}

export default function Page() {
  return (
    <ToolLayout slug="stopwatch">
      <StopwatchTool />
    </ToolLayout>
  );
}
