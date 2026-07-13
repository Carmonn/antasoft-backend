import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { MunicipioDetailSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";
import { municipiosErrors } from "../errors.ts";

export const getMunicipiosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Catalogos: Municipios"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(MunicipioDetailSchema),
        },
      },
      description: "Obtiene el catálogo de municipios",
    },
    ...toErrorSchema(municipiosErrors.notFound),
  },
});
