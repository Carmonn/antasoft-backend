import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getRolesByIdRoute } from "../routes/getById.ts";
import { getRolByIdService } from "../services/getById.ts";

export const getRolByIdHandler: RouteHandler<
  typeof getRolesByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getRolByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
