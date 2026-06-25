import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import CssMinifierTool from "@/components/tools/CssMinifierTool";

export function generateMetadata() {
  return generateToolMetadata("css-minifier");
}

export default function Page() {
  return (
    <ToolLayout slug="css-minifier">
      <CssMinifierTool />
    </ToolLayout>
  );
}
