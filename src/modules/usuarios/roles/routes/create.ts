import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { RolDetailSchema } from "../schemas/response.ts";
import { CreateRolSchema } from "../schemas/request.ts";
import { rolesErrors } from "../errors.ts";

export const createRolesRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Usuarios: Roles"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateRolSchema,
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
      description: "Crea un nuevo rol",
    },
    ...toErrorSchema(rolesErrors.alreadyExists, rolesErrors.notFoundPermiso),
  },
});
