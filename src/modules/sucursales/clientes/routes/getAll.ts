import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

import { ListClienteDetailSchema } from "../schemas/response.ts";

export const getAllClientesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Sucursales: Clientes"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListClienteDetailSchema),
        },
      },
      description: "Obtiene todos los clientes",
    },
  },
});
