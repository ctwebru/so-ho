import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getCafeInfo from "./tools/get-cafe-info";
import listMenu from "./tools/list-menu";
import listPlans from "./tools/list-plans";
import whoami from "./tools/whoami";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "so-ho-mcp",
  title: "SO-HO!",
  version: "0.1.0",
  instructions:
    "Инструменты SO-HO! — кофейни и коворкинга в Новосибирске. Используй list_menu для меню кофейни, list_plans для тарифов коворкинга, get_cafe_info для адреса и часов работы, whoami для профиля вошедшего пользователя.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getCafeInfo, listMenu, listPlans, whoami],
});
