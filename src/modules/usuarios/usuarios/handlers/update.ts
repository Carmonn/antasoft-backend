import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { updateUsuariosRoute } from "../routes/update.ts";
import { updateUsuarioService } from "../services/update.ts";

export const updateUsuariosHandler: RouteHandler<
  typeof updateUsuariosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");
  const { id } = c.req.valid("param");

  const response = await updateUsuarioService(prisma, id, body);

  return c.json(toApiSuccess(response), 200);
};
