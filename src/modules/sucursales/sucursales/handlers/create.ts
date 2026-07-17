import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { createSucursalesRoute } from "../routes/create.ts";
import { createSucursalService } from "../services/create.ts";

export const createSucursalesHandler: RouteHandler<
  typeof createSucursalesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");

  const response = await createSucursalService(prisma, body);
  return c.json(toApiSuccess(response), 200);
};
