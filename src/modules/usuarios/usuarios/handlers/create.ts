import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { createUsuariosRoute } from "../routes/create.ts";
import { createUsuarioService } from "../services/create.ts";

export const createUsuariosHandler: RouteHandler<
  typeof createUsuariosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");

  const response = await createUsuarioService(prisma, body);
  return c.json(toApiSuccess(response), 200);
};
