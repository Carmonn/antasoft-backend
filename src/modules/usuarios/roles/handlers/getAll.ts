import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAllRolesRoute } from "../routes/getAll.ts";
import { listRolesService } from "../services/getAll.ts";

export const listRolesHandler: RouteHandler<
  typeof getAllRolesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listRolesService(prisma);

  return c.json(toApiSuccess(response), 200);
};
