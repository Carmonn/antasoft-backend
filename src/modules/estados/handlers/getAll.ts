import type { RouteHandler } from "@hono/zod-openapi";

import { getAllEstadosRoute } from "../routes/getAll.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import type { AppEnv } from "@/main.ts";
import { listEstadosService } from "../services/getAll.ts";

export const listEstadosHandler: RouteHandler<
  typeof getAllEstadosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listEstadosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
