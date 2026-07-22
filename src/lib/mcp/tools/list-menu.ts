import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

type Item = {
  id: string;
  name: string;
  category: "coffee" | "nocoffee" | "spring" | "combo";
  group: string;
  price: number;
  soldOut?: boolean;
};

const MENU: Item[] = [
  { id: "espresso", name: "Эспрессо", category: "coffee", group: "черный кофе", price: 180 },
  { id: "americano", name: "Американо", category: "coffee", group: "черный кофе", price: 200 },
  { id: "cappuccino", name: "Капучино", category: "coffee", group: "кофе с молоком", price: 280 },
  { id: "latte", name: "Латте", category: "coffee", group: "кофе с молоком", price: 300 },
  { id: "flat-white", name: "Флэт уайт", category: "coffee", group: "кофе с молоком", price: 310 },
  { id: "raf-classic", name: "Раф классический", category: "coffee", group: "кофе с молоком", price: 320 },
  { id: "raf-salt-caramel", name: "Раф солёная карамель", category: "coffee", group: "кофе с молоком", price: 315, soldOut: true },
  { id: "cortado", name: "Кортадо", category: "coffee", group: "кофе с молоком", price: 260 },
  { id: "matcha-latte", name: "Матча латте", category: "nocoffee", group: "матча", price: 340 },
  { id: "matcha-banana", name: "Матча банан", category: "nocoffee", group: "матча", price: 375, soldOut: true },
  { id: "cocoa", name: "Какао", category: "nocoffee", group: "какао", price: 290 },
  { id: "tea-hot", name: "Чайный коктейль · горячий", category: "nocoffee", group: "чайные коктейли", price: 260 },
  { id: "tea-cold", name: "Чайный коктейль · холодный", category: "nocoffee", group: "чайные коктейли", price: 290 },
  { id: "pistachio-latte", name: "Фисташковый латте", category: "spring", group: "весна", price: 360, soldOut: true },
];

export default defineTool({
  name: "list_menu",
  title: "List cafe menu",
  description: "List drinks from the SO-HO! cafe menu. Optionally filter by category.",
  inputSchema: {
    category: z
      .enum(["coffee", "nocoffee", "spring", "combo"])
      .optional()
      .describe("Optional category filter."),
    include_sold_out: z
      .boolean()
      .optional()
      .describe("Include items that are temporarily out of stock. Default: true."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, include_sold_out }) => {
    const includeSoldOut = include_sold_out ?? true;
    const items = MENU.filter(
      (m) => (!category || m.category === category) && (includeSoldOut || !m.soldOut),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(items) }],
      structuredContent: { items },
    };
  },
});
