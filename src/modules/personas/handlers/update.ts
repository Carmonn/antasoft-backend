import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { updatePersonasRoute } from "../routes/update.ts";
import { updatePersonaService } from "../services/update.ts";

export const updatePersonasHandler: RouteHandler<
  typeof updatePersonasRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");
  const body = c.req.valid("json");
  const { id } = c.req.valid("param");

  const response = await updatePersonaService(prisma, id, body);

  return c.json(toApiSuccess(response), 200);
};
