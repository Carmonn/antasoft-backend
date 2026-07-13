import type { RouteHandler } from "@hono/zod-openapi";

import { getAllEstatusHonorariosRoute } from "../routes/getAll.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import type { AppEnv } from "@/main.ts";
import { listEstatusHonorariosService } from "../services/getAll.ts";

export const listEstatusHonorariosHandler: RouteHandler<
  typeof getAllEstatusHonorariosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listEstatusHonorariosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
