import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { createClientesRoute } from "../routes/create.ts";
import { createClienteService } from "../services/create.ts";

export const createClientesHandler: RouteHandler<
  typeof createClientesRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");

  const response = await createClienteService(prisma, body);
  return c.json(toApiSuccess(response), 200);
};
