import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { updateAsignacionesRoute } from "../routes/update.ts";
import { updateAsignacionService } from "../services/update.ts";

export const updateAsignacionesHandler: RouteHandler<
  typeof updateAsignacionesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");
  const { id } = c.req.valid("param");

  const response = await updateAsignacionService(prisma, id, body);

  return c.json(toApiSuccess(response), 200);
};
