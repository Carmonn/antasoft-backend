import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { createPersonasRoute } from "../routes/create.ts";
import { createPersonaService } from "../services/create.ts";

export const createPersonasHandler: RouteHandler<
  typeof createPersonasRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");

  const response = await createPersonaService(prisma, body);
  return c.json(toApiSuccess(response), 200);
};
