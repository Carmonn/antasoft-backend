import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

import { ListSucursalDetailSchema } from "../schemas/response.ts";

export const getAllSucursalesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Sucursales: Sucursales"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListSucursalDetailSchema),
        },
      },
      description: "Obtiene todas las sucursales",
    },
  },
});
