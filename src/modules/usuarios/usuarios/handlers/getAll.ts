import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAllUsuariosRoute } from "../routes/getAll.ts";
import { listUsuariosService } from "../services/getAll.ts";

export const listUsuariosHandler: RouteHandler<
  typeof getAllUsuariosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listUsuariosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
