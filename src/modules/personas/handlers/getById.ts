import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getPersonasByIdRoute } from "../routes/getById.ts";
import { getPersonaByIdService } from "../services/getById.ts";

export const getPersonaByIdHandler: RouteHandler<
  typeof getPersonasByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getPersonaByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
