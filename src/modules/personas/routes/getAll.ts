import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

import { ListPersonaBasicSchema } from "../schemas/response.ts";

export const getAllPersonasRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Personas"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListPersonaBasicSchema),
        },
      },
      description: "Obtiene todas las personas",
    },
  },
});
