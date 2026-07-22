import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { deleteHonorariosRoute } from "../routes/delete.ts";
import { deleteHonorarioService } from "../services/delete.ts";

export const deleteHonorariosHandler: RouteHandler<
  typeof deleteHonorariosRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await deleteHonorarioService(prisma, id);

  return c.json(toApiSuccess(response), 200);
};
