import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { deleteAsignacionesRoute } from "../routes/delete.ts";
import { deleteAsignacionService } from "../services/delete.ts";

export const deleteAsignacionesHandler: RouteHandler<
  typeof deleteAsignacionesRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await deleteAsignacionService(prisma, id);

  return c.json(toApiSuccess(response), 200);
};
