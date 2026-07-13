import type { RouteHandler } from "@hono/zod-openapi";

import { getAllMediosRoute } from "../routes/getAll.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import type { AppEnv } from "@/main.ts";
import { listMediosService } from "../services/getAll.ts";

export const listMediosHandler: RouteHandler<
  typeof getAllMediosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listMediosService(prisma);

  return c.json(toApiSuccess(response), 200);
};
