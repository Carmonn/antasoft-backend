import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

import { ListUsuarioBasicSchema } from "../schemas/response.ts";

export const getAllUsuariosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Usuarios: Usuarios"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListUsuarioBasicSchema),
        },
      },
      description: "Obtiene todos los usuarios",
    },
  },
});
