import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getMediosByIdRoute } from "../routes/getById.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import { getMedioByIdService } from "../services/getById.ts";

export const getMedioByIdHandler: RouteHandler<
  typeof getMediosByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getMedioByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
