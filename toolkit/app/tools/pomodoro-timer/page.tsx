import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import PomodoroTimerTool from "@/components/tools/PomodoroTimerTool";

export function generateMetadata() {
  return generateToolMetadata("pomodoro-timer");
}

export default function Page() {
  return (
    <ToolLayout slug="pomodoro-timer">
      <PomodoroTimerTool />
    </ToolLayout>
  );
}
