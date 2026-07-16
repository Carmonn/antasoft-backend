import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { UsuarioDetailSchema } from "../schemas/response.ts";
import { usuariosErrors } from "../errors.ts";

export const getUsuariosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Usuarios: Usuarios"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(UsuarioDetailSchema),
        },
      },
      description:
        "Obtiene la información detallada de un usuario en específico",
    },
    ...toErrorSchema(usuariosErrors.notFound),
  },
});
