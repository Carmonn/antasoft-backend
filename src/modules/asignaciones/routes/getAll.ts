import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

import { ListAsignacionDetailSchema } from "../schemas/response.ts";

export const getAllAsignacionesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Asignaciones"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListAsignacionDetailSchema),
        },
      },
      description: "Obtiene todas las asignaciones",
    },
  },
});
