import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { ClienteDetailSchema } from "../schemas/response.ts";
import { CreateClienteSchema } from "../schemas/request.ts";
import { clientesErrors } from "../errors.ts";

export const createClientesRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Sucursales: Clientes"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateClienteSchema,
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
      description: "Crea un nuevo cliente",
    },
    ...toErrorSchema(clientesErrors.alreadyExists),
  },
});
