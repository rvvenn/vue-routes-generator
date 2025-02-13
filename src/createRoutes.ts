import type { RouteRecordRaw } from "vue-router"
import type { CreateRoutesConfig } from "@/types/create-routes"

const createRoutes = ({
  source = "src/app",
  i18n,
  type = "folder"
}: CreateRoutesConfig): readonly RouteRecordRaw[] => {
  return []
}

export default createRoutes;