import type { RouteHandler } from "@hono/zod-openapi";

import { getAllEstatusAsignacionesRoute } from "../routes/getAll.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import type { AppEnv } from "@/main.ts";
import { listEstatusTrabajosService } from "../services/getAll.ts";

export const listEstatusAsignacionesHandler: RouteHandler<
  typeof getAllEstatusAsignacionesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listEstatusTrabajosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
