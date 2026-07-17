import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { SucursalDetailSchema } from "../schemas/response.ts";
import { sucursalesErrors } from "../errors.ts";

export const deleteSucursalesRoute = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Sucursales: Sucursales"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(SucursalDetailSchema),
        },
      },
      description: "Elimina una sucursal",
    },
    ...toErrorSchema(sucursalesErrors.notFound),
  },
});
