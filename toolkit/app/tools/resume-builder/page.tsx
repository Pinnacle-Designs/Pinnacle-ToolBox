import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ResumeBuilderTool from "@/components/tools/ResumeBuilderTool";

export function generateMetadata() {
  return generateToolMetadata("resume-builder");
}

export default function Page() {
  return (
    <ToolLayout slug="resume-builder">
      <ResumeBuilderTool />
    </ToolLayout>
  );
}
