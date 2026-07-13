import type { RouteHandler } from "@hono/zod-openapi";

import { getAllTrabajosRoute } from "../routes/getAll.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import type { AppEnv } from "@/main.ts";
import { listTrabajosService } from "../services/getAll.ts";

export const listTrabajosHandler: RouteHandler<
  typeof getAllTrabajosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listTrabajosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
