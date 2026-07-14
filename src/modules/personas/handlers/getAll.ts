import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getAllPersonasRoute } from "../routes/getAll.ts";
import { listPersonasService } from "../services/getAll.ts";

export const listPersonasHandler: RouteHandler<
  typeof getAllPersonasRoute,
  AppEnv
> = async (c) => {
  const prisma = c.get("prisma");

  const response = await listPersonasService(prisma);

  return c.json(toApiSuccess(response), 200);
};
