import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { updateRolesRoute } from "../routes/update.ts";
import { updateRolService } from "../services/update.ts";

export const updateRolesHandler: RouteHandler<
  typeof updateRolesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");
  const { id } = c.req.valid("param");

  const response = await updateRolService(prisma, id, body);

  return c.json(toApiSuccess(response), 200);
};
