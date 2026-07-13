import { createRoute } from "@hono/zod-openapi";
import { ListMunicipioBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

export const getAllMunicipiosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Catalogos: Municipios"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListMunicipioBasicSchema),
        },
      },
      description: "Obtiene el catálogo de municipios",
    },
  },
});
