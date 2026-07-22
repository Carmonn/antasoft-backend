import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { createHonorariosRoute } from "../routes/create.ts";
import { createHonorarioService } from "../services/create.ts";

export const createHonorariosHandler: RouteHandler<
  typeof createHonorariosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");

  const response = await createHonorarioService(prisma, body);
  return c.json(toApiSuccess(response), 200);
};
