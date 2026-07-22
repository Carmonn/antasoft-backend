import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { HonorarioDetailSchema } from "../schemas/response.ts";
import { UpdateHonorarioSchema } from "../schemas/request.ts";
import { honorariosErrors } from "../errors.ts";

export const updateHonorariosRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Honorarios"],
  request: {
    params: IdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateHonorarioSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(HonorarioDetailSchema),
        },
      },
      description: "Edita un honorario",
    },
    ...toErrorSchema(honorariosErrors.notFound, honorariosErrors.alreadyExists),
  },
});
