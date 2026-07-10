import { createRoute } from "@hono/zod-openapi";
import { ListPermisoBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

export const getAllPermisosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Catalogos: Permisos"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListPermisoBasicSchema),
        },
      },
      description: "Obtiene el catálogo de permisos",
    },
  },
});
