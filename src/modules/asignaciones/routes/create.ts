import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { AsignacionDetailSchema } from "../schemas/response.ts";
import { CreateAsignacionSchema } from "../schemas/request.ts";
import { asignacionesErrors } from "../errors.ts";

export const createAsignacionesRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Asignaciones"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateAsignacionSchema,
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
      description: "Crea una nueva asignación",
    },
    ...toErrorSchema(asignacionesErrors.alreadyExists),
  },
});
