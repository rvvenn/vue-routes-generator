import { describe, test, expect } from "vitest";
import createRoutes from "@/createRoutes";

describe("Create Routes", () => {
  // 1. Is array
  test("Is Array Instance", () => {
    const routes = createRoutes({});
    expect(routes).toBeInstanceOf(Array);
  })

  // 2. Create a page
  test("Create a Page", () => {
    const routes = createRoutes({
      testRoutes: [
        "app/page.vue"
      ]
    });
    expect(routes).toStrictEqual([
      {
        path: "",
        component: () => import("app/page.vue"),
      }
    ]);
  })

  // 3. Create a layout

  // 4. Create a nested route (page)

  // 4.1. Create a nested route (slug)

  // 5. Create a nested layout

  // 6. Create a error page

  // 7. Route groups

  // 8. Route group layout

  // 9. Create a named slot

  // 10. Internationalization

}) 