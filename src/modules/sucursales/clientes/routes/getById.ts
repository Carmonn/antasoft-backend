import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { ClienteDetailSchema } from "../schemas/response.ts";
import { clientesErrors } from "../errors.ts";

export const getClientesByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Sucursales: Clientes"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ClienteDetailSchema),
        },
      },
      description: "Obtiene la información detallada de un cliente específico",
    },
    ...toErrorSchema(clientesErrors.notFound),
  },
});
