import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { deletePersonasRoute } from "../routes/delete.ts";
import { deletePersonaService } from "../services/delete.ts";

export const deletePersonasHandler: RouteHandler<
  typeof deletePersonasRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await deletePersonaService(prisma, id);

  return c.json(toApiSuccess(response), 200);
};
