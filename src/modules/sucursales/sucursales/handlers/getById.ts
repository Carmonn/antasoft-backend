import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { toApiSuccess } from "@/shared/mapper.ts";

import { getSucursalesByIdRoute } from "../routes/getById.ts";
import { getSucursalByIdService } from "../services/getById.ts";

export const getSucursalByIdHandler: RouteHandler<
  typeof getSucursalesByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getSucursalByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
