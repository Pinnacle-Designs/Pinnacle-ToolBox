import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import CountdownTimerTool from "@/components/tools/CountdownTimerTool";

export function generateMetadata() {
  return generateToolMetadata("countdown-timer");
}

export default function Page() {
  return (
    <ToolLayout slug="countdown-timer">
      <CountdownTimerTool />
    </ToolLayout>
  );
}
