import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { deleteSucursalesRoute } from "../routes/delete.ts";
import { deleteSucursalService } from "../services/delete.ts";

export const deleteSucursalesHandler: RouteHandler<
  typeof deleteSucursalesRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await deleteSucursalService(prisma, id);

  return c.json(toApiSuccess(response), 200);
};
