import { createRoute } from "@hono/zod-openapi";
import { ListEstadoBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

export const getAllEstadosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Catalogos: Estados"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListEstadoBasicSchema),
        },
      },
      description: "Obtiene el catálogo de estados",
    },
  },
});
