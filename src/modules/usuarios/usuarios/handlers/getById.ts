import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getUsuariosByIdRoute } from "../routes/getById.ts";
import { getUsuarioByIdService } from "../services/getById.ts";

export const getUsuarioByIdHandler: RouteHandler<
  typeof getUsuariosByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getUsuarioByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
