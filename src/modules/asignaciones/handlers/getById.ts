import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAsignacionesByIdRoute } from "../routes/getById.ts";
import { getAsignacionByIdService } from "../services/getById.ts";

export const getAsignacionByIdHandler: RouteHandler<
  typeof getAsignacionesByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getAsignacionByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
