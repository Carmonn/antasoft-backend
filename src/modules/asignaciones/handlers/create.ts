import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { createAsignacionesRoute } from "../routes/create.ts";
import { createAsignacionService } from "../services/create.ts";

export const createAsignacionesHandler: RouteHandler<
  typeof createAsignacionesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");

  const response = await createAsignacionService(prisma, body);
  return c.json(toApiSuccess(response), 200);
};
