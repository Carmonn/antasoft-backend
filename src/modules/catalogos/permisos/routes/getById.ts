import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { PermisoBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";
import { permisosErrors } from "../errors.ts";

export const getPermisosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Catalogos: Permisos"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(PermisoBasicSchema),
        },
      },
      description: "Obtiene la información detallada de un medio específico",
    },
    ...toErrorSchema(permisosErrors.notFound),
  },
});
