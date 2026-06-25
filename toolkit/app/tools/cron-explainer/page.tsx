import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import CronExplainerTool from "@/components/tools/CronExplainerTool";

export function generateMetadata() {
  return generateToolMetadata("cron-explainer");
}

export default function Page() {
  return (
    <ToolLayout slug="cron-explainer">
      <CronExplainerTool />
    </ToolLayout>
  );
}
