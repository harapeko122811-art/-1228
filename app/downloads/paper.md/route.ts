import { paperToMarkdown } from "@/lib/paper";

export const dynamic = "force-static";

export function GET() {
  return new Response(paperToMarkdown(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
