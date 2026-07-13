import { createRoute } from "@hono/zod-openapi";
import { ListMedioBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

export const getAllMediosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Catalogos: Medios"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListMedioBasicSchema),
        },
      },
      description: "Obtiene el catálogo de medios",
    },
  },
});
