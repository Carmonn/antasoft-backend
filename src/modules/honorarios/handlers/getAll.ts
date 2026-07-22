import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAllHonorariosRoute } from "../routes/getAll.ts";
import { listHonorariosService } from "../services/getAll.ts";

export const listHonorariosHandler: RouteHandler<
  typeof getAllHonorariosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listHonorariosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
