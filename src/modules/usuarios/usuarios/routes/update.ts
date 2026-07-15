import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { UsuarioDetailSchema } from "../schemas/response.ts";
import { UpdateUsuarioSchema } from "../schemas/request.ts";
import { usuariosErrors } from "../errors.ts";

export const updateUsuariosRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Personas"],
  request: {
    params: IdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateUsuarioSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(UsuarioDetailSchema),
        },
      },
      description: "Edita un usuario",
    },
    ...toErrorSchema(usuariosErrors.notFound, usuariosErrors.alreadyExists),
  },
});
