import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getEstatusAsignacionesByIdRoute } from "../routes/getById.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import { getEstatusAsignacionByIdService } from "../services/getById.ts";

export const getEstatusAsignacionByIdHandler: RouteHandler<
  typeof getEstatusAsignacionesByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getEstatusAsignacionByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
