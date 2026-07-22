import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { updateHonorariosRoute } from "../routes/update.ts";
import { updateHonorarioService } from "../services/update.ts";

export const updateHonorariosHandler: RouteHandler<
  typeof updateHonorariosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");
  const { id } = c.req.valid("param");

  const response = await updateHonorarioService(prisma, id, body);

  return c.json(toApiSuccess(response), 200);
};
