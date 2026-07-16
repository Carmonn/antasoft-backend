import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { RolDetailSchema } from "../schemas/response.ts";
import { rolesErrors } from "../errors.ts";

export const getRolesByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Usuarios: Roles"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(RolDetailSchema),
        },
      },
      description: "Obtiene la información detallada de un rol específico",
    },
    ...toErrorSchema(rolesErrors.notFound),
  },
});
