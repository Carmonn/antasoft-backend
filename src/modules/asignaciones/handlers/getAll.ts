import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAllAsignacionesRoute } from "../routes/getAll.ts";
import { listAsignacionesService } from "../services/getAll.ts";

export const listAsignacionesHandler: RouteHandler<
  typeof getAllAsignacionesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listAsignacionesService(prisma);

  return c.json(toApiSuccess(response), 200);
};
