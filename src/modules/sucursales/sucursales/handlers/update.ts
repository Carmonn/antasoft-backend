import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { updateSucursalesRoute } from "../routes/update.ts";
import { updateSucursalService } from "../services/update.ts";

export const updateSucursalesHandler: RouteHandler<
  typeof updateSucursalesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");
  const { id } = c.req.valid("param");

  const response = await updateSucursalService(prisma, id, body);

  return c.json(toApiSuccess(response), 200);
};
