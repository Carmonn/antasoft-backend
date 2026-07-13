import { createRoute } from "@hono/zod-openapi";
import { ListTrabajoBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

export const getAllTrabajosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Catalogos: Trabajos"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListTrabajoBasicSchema),
        },
      },
      description: "Obtiene el catálogo de trabajos",
    },
  },
});
