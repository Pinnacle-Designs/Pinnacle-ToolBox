import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import DuplicateLineRemoverTool from "@/components/tools/DuplicateLineRemoverTool";

export function generateMetadata() {
  return generateToolMetadata("duplicate-line-remover");
}

export default function Page() {
  return (
    <ToolLayout slug="duplicate-line-remover">
      <DuplicateLineRemoverTool />
    </ToolLayout>
  );
}
