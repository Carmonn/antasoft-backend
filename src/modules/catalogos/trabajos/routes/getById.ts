import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { TrabajoBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";
import { trabajosErrors } from "../errors.ts";

export const getTrabajosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Catalogos: Trabajos"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(TrabajoBasicSchema),
        },
      },
      description: "Obtiene la información detallada de un medio específico",
    },
    ...toErrorSchema(trabajosErrors.notFound),
  },
});
