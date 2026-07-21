import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { AsignacionDetailSchema } from "../schemas/response.ts";
import { UpdateAsignacionSchema } from "../schemas/request.ts";
import { asignacionesErrors } from "../errors.ts";

export const updateAsignacionesRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Asignaciones"],
  request: {
    params: IdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateAsignacionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(AsignacionDetailSchema),
        },
      },
      description: "Edita una asignación",
    },
    ...toErrorSchema(
      asignacionesErrors.notFound,
      asignacionesErrors.alreadyExists,
    ),
  },
});
