import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { SucursalDetailSchema } from "../schemas/response.ts";
import { UpdateSucursalSchema } from "../schemas/request.ts";
import { sucursalesErrors } from "../errors.ts";

export const updateSucursalesRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Sucursales: Sucursales"],
  request: {
    params: IdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateSucursalSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(SucursalDetailSchema),
        },
      },
      description: "Edita una sucursal",
    },
    ...toErrorSchema(sucursalesErrors.notFound, sucursalesErrors.alreadyExists),
  },
});
