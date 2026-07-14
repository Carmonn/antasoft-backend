import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { deleteRolesRoute } from "../routes/delete.ts";
import { deleteRolService } from "../services/delete.ts";

export const deleteRolesHandler: RouteHandler<
  typeof deleteRolesRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await deleteRolService(prisma, id);

  return c.json(toApiSuccess(response), 200);
};
