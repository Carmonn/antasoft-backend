import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { UsuarioDetailSchema } from "../schemas/response.ts";
import { CreateUsuarioSchema } from "../schemas/request.ts";
import { usuariosErrors } from "../errors.ts";

export const createUsuariosRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Usuarios: Usuarios"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateUsuarioSchema,
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
      description: "Crea un nuevo usuario",
    },
    ...toErrorSchema(usuariosErrors.alreadyExists),
  },
});
