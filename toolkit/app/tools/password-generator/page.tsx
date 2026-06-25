import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("password-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="password-generator">
      <PasswordGeneratorTool />
    </ToolLayout>
  );
}
