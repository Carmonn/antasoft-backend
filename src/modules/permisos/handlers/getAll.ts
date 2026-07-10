import type { RouteHandler } from "@hono/zod-openapi";

import { getAllPermisosRoute } from "../routes/getAll.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import type { AppEnv } from "@/main.ts";
import { listPermisosService } from "../services/getAll.ts";

export const listPermisosHandler: RouteHandler<
  typeof getAllPermisosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listPermisosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
