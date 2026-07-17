import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAllSucursalesRoute } from "../routes/getAll.ts";
import { listSucursalesService } from "../services/getAll.ts";

export const listSucursalesHandler: RouteHandler<
  typeof getAllSucursalesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listSucursalesService(prisma);

  return c.json(toApiSuccess(response), 200);
};
