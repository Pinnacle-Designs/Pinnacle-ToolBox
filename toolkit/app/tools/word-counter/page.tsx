import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import WordCounterTool from "@/components/tools/WordCounterTool";

export function generateMetadata() {
  return generateToolMetadata("word-counter");
}

export default function Page() {
  return (
    <ToolLayout slug="word-counter">
      <WordCounterTool />
    </ToolLayout>
  );
}
