import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { deleteClientesRoute } from "../routes/delete.ts";
import { deleteClienteService } from "../services/delete.ts";

export const deleteClientesHandler: RouteHandler<
  typeof deleteClientesRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await deleteClienteService(prisma, id);

  return c.json(toApiSuccess(response), 200);
};
