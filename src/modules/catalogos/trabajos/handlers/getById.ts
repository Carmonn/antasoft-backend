import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getTrabajosByIdRoute } from "../routes/getById.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import { getTrabajoByIdService } from "../services/getById.ts";

export const getTrabajoByIdHandler: RouteHandler<
  typeof getTrabajosByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getTrabajoByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
