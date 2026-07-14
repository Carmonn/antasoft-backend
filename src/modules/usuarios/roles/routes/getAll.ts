import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

import { ListRolBasicSchema } from "../schemas/response.ts";

export const getAllRolesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Usuarios: Roles"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListRolBasicSchema),
        },
      },
      description: "Obtiene todos los roles",
    },
  },
});
