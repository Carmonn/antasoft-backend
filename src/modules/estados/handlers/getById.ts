import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getEstadosByIdRoute } from "../routes/getById.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import { getEstadoByIdService } from "../services/getById.ts";

export const getEstadoByIdHandler: RouteHandler<
  typeof getEstadosByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getEstadoByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
