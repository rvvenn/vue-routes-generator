import { describe, test, expect } from "vitest";
import createRoutes from "@/createRoutes";

describe("Create Routes", () => {
  test("Is RecorRaw Instance", () => {
    const routes = createRoutes({});
    expect(routes).toBeInstanceOf(Array);
  })
})