import type { RouteHandler } from "@hono/zod-openapi";

import { getAllMunicipiosRoute } from "../routes/getAll.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import type { AppEnv } from "@/main.ts";
import { listMunicipiosService } from "../services/getAll.ts";

export const listMunicipiosHandler: RouteHandler<
  typeof getAllMunicipiosRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const response = await listMunicipiosService(prisma);
  return c.json(toApiSuccess(response), 200);
};
