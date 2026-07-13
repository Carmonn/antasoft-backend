import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { EstadoDetailSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";
import { estadosErrors } from "../errors.ts";

export const getEstadosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Catalogos: Estados"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(EstadoDetailSchema),
        },
      },
      description: "Obtiene la información detallada de un estado específico",
    },
    ...toErrorSchema(estadosErrors.notFound),
  },
});
