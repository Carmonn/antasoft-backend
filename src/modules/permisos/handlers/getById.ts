import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getPermisosByIdRoute } from "../routes/getById.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import { getPermisoByIdService } from "../services/getById.ts";

export const getPermisoByIdHandler: RouteHandler<
  typeof getPermisosByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getPermisoByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
