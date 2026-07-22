import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { HonorarioDetailSchema } from "../schemas/response.ts";
import { honorariosErrors } from "../errors.ts";

export const deleteHonorariosRoute = createRoute({
  method: "delete",
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
      description: "Elimina un honorario",
    },
    ...toErrorSchema(honorariosErrors.notFound),
  },
});
