import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { HonorarioDetailSchema } from "../schemas/response.ts";
import { CreateHonorarioSchema } from "../schemas/request.ts";
import { honorariosErrors } from "../errors.ts";

export const createHonorariosRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Honorarios"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateHonorarioSchema,
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
      description: "Crea un nuevo honorario",
    },
    ...toErrorSchema(honorariosErrors.alreadyExists),
  },
});
