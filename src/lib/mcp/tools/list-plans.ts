import { defineTool } from "@lovable.dev/mcp-js";

const PLANS = [
  { code: "fast", name: "Fast", description: "Быстрый визит: кофе и место на пару часов", duration: "до 3 часов" },
  { code: "day", name: "Day Pass", description: "Полный день в коворкинге", duration: "1 день" },
  { code: "flex", name: "Flex", description: "10 дней в месяц, гибкий график", duration: "30 дней" },
  { code: "fix", name: "Fix", description: "Закреплённое место, безлимит", duration: "30 дней" },
];

export default defineTool({
  name: "list_plans",
  title: "List membership plans",
  description: "List SO-HO! coworking membership plans (Fast, Day, Flex, Fix).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PLANS) }],
    structuredContent: { plans: PLANS },
  }),
});
