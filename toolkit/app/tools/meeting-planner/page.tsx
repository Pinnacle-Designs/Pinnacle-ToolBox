import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import MeetingPlannerTool from "@/components/tools/MeetingPlannerTool";

export function generateMetadata() {
  return generateToolMetadata("meeting-planner");
}

export default function Page() {
  return (
    <ToolLayout slug="meeting-planner">
      <MeetingPlannerTool />
    </ToolLayout>
  );
}
