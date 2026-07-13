import { createRoute } from "@hono/zod-openapi";
import { ListEstatusHonorarioBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

export const getAllEstatusHonorariosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Catalogos: Estatus de Honorarios"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListEstatusHonorarioBasicSchema),
        },
      },
      description: "Obtiene el catálogo de estatus de honorarios",
    },
  },
});
