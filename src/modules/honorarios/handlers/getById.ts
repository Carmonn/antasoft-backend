import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getHonorariosByIdRoute } from "../routes/getById.ts";
import { getHonorarioByIdService } from "../services/getById.ts";

export const getHonorarioByIdHandler: RouteHandler<
  typeof getHonorariosByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getHonorarioByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
