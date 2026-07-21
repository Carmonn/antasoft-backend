import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { AsignacionDetailSchema } from "../schemas/response.ts";
import { asignacionesErrors } from "../errors.ts";

export const getAsignacionesByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Asignaciones"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(AsignacionDetailSchema),
        },
      },
      description:
        "Obtiene la información detallada de una asignación específica",
    },
    ...toErrorSchema(asignacionesErrors.notFound),
  },
});
