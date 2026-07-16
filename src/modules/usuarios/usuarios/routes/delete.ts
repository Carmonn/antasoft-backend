import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { UsuarioBasicSchema } from "../schemas/response.ts";
import { usuariosErrors } from "../errors.ts";

export const deleteUsuarioRoute = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Usuarios: Usuarios"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(UsuarioBasicSchema),
        },
      },
      description: "Elimina un usuario",
    },
    ...toErrorSchema(usuariosErrors.notFound),
  },
});
