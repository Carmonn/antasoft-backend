import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { RolDetailSchema } from "../schemas/response.ts";
import { UpdateRolSchema } from "../schemas/request.ts";
import { rolesErrors } from "../errors.ts";

export const updateRolesRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Usuarios: Roles"],
  request: {
    params: IdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateRolSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(RolDetailSchema),
        },
      },
      description: "Edita un rol",
    },
    ...toErrorSchema(
      rolesErrors.notFound,
      rolesErrors.alreadyExists,
      rolesErrors.notFoundPermiso,
    ),
  },
});
