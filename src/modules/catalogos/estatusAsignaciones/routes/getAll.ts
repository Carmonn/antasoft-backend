import { createRoute } from "@hono/zod-openapi";
import { ListEstatusAsignacionBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

export const getAllEstatusAsignacionesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Catalogos: Estatus de Asignaciónes"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListEstatusAsignacionBasicSchema),
        },
      },
      description: "Obtiene el catálogo de estatus de asignaciónes",
    },
  },
});
