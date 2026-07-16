import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAllClientesRoute } from "../routes/getAll.ts";
import { listClientesService } from "../services/getAll.ts";

export const listClientesHandler: RouteHandler<
  typeof getAllClientesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listClientesService(prisma);

  return c.json(toApiSuccess(response), 200);
};
