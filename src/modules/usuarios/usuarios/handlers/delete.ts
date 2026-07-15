import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { deleteUsuarioRoute } from "../routes/delete.ts";
import { deleteUsuarioService } from "../services/delete.ts";

export const deleteUsuariosHandler: RouteHandler<
  typeof deleteUsuarioRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await deleteUsuarioService(prisma, id);

  return c.json(toApiSuccess(response), 200);
};
