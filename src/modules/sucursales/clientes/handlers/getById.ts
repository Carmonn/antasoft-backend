import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getClientesByIdRoute } from "../routes/getById.ts";
import { getClienteByIdService } from "../services/getById.ts";

export const getClienteByIdHandler: RouteHandler<
  typeof getClientesByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getClienteByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
