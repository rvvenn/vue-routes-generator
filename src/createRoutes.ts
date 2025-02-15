import type { RouteRecordRaw } from "vue-router"
import type { CreateRoutesConfig } from "@/types/create-routes"

const createRoutes = ({
  source = "src/app",
  i18n,
  type = "folder",
  testRoutes,
}: CreateRoutesConfig): readonly RouteRecordRaw[] => {
  
  const folderPaths = testRoutes;

  console.log(folderPaths)

  return [
    {
      path: "",
      component: () => import("app/page.vue"),
    }
  ]
}

export default createRoutes;