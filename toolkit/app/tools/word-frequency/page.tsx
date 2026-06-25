import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import WordFrequencyTool from "@/components/tools/WordFrequencyTool";

export function generateMetadata() {
  return generateToolMetadata("word-frequency");
}

export default function Page() {
  return (
    <ToolLayout slug="word-frequency">
      <WordFrequencyTool />
    </ToolLayout>
  );
}
