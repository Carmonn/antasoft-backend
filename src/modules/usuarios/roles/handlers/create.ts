import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { createRolesRoute } from "../routes/create.ts";
import { createRolService } from "../services/create.ts";

export const createRolesHandler: RouteHandler<
  typeof createRolesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");

  const response = await createRolService(prisma, body);
  return c.json(toApiSuccess(response), 200);
};
