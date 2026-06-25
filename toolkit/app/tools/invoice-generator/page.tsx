import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import InvoiceGeneratorTool from "@/components/tools/InvoiceGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("invoice-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="invoice-generator">
      <InvoiceGeneratorTool />
    </ToolLayout>
  );
}
