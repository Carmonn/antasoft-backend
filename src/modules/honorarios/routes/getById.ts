import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { HonorarioDetailSchema } from "../schemas/response.ts";
import { honorariosErrors } from "../errors.ts";

export const getHonorariosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Honorarios"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(HonorarioDetailSchema),
        },
      },
      description:
        "Obtiene la información detallada de un honorario específico",
    },
    ...toErrorSchema(honorariosErrors.notFound),
  },
});
