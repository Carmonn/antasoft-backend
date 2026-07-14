import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { RolDetailSchema } from "../schemas/response.ts";
import { rolesErrors } from "../errors.ts";

export const deleteRolesRoute = createRoute({
  method: "delete",
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
      description: "Elimina una persona",
    },
    ...toErrorSchema(rolesErrors.notFound),
  },
});
