import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { SucursalDetailSchema } from "../schemas/response.ts";
import { CreateSucursalSchema } from "../schemas/request.ts";
import { sucursalesErrors } from "../errors.ts";

export const createSucursalesRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Sucursales: Sucursales"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateSucursalSchema,
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
      description: "Crea una nueva sucursal",
    },
    ...toErrorSchema(sucursalesErrors.alreadyExists),
  },
});
