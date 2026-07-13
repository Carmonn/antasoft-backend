import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { MedioBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";
import { mediosErrors } from "../errors.ts";

export const getMediosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Catalogos: Medios"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(MedioBasicSchema),
        },
      },
      description: "Obtiene la información detallada de un medio específico",
    },
    ...toErrorSchema(mediosErrors.notFound),
  },
});
