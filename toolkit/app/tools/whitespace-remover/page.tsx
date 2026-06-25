import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import WhitespaceRemoverTool from "@/components/tools/WhitespaceRemoverTool";

export function generateMetadata() {
  return generateToolMetadata("whitespace-remover");
}

export default function Page() {
  return (
    <ToolLayout slug="whitespace-remover">
      <WhitespaceRemoverTool />
    </ToolLayout>
  );
}
