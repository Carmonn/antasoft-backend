import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { AsignacionDetailSchema } from "../schemas/response.ts";
import { asignacionesErrors } from "../errors.ts";

export const deleteAsignacionesRoute = createRoute({
  method: "delete",
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
      description: "Elimina una asignación",
    },
    ...toErrorSchema(asignacionesErrors.notFound),
  },
});
