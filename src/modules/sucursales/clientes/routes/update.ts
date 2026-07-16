import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { ClienteDetailSchema } from "../schemas/response.ts";
import { UpdateClienteSchema } from "../schemas/request.ts";
import { clientesErrors } from "../errors.ts";

export const updateClientesRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Sucursales: Clientes"],
  request: {
    params: IdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateClienteSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ClienteDetailSchema),
        },
      },
      description: "Edita un cliente",
    },
    ...toErrorSchema(clientesErrors.notFound, clientesErrors.alreadyExists),
  },
});
