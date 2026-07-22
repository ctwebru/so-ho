import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_cafe_info",
  title: "Get cafe info",
  description: "Basic info about the SO-HO! cafe/coworking: address, hours, contacts.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          name: "SO-HO!",
          tagline: "Coffee · Work · Meet",
          address: "Дачное шоссе, д.22/3, Новосибирск",
          hours: "08:00–20:00",
          email: "hello@so-ho.ru",
          website: "https://so-ho.ru",
        }),
      },
    ],
  }),
});
