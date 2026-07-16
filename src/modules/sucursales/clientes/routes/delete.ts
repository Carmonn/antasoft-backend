import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { ClienteDetailSchema } from "../schemas/response.ts";
import { clientesErrors } from "../errors.ts";

export const deleteClientesRoute = createRoute({
  method: "delete",
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
      description: "Elimina un cliente",
    },
    ...toErrorSchema(clientesErrors.notFound),
  },
});
