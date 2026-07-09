import type { RouteHandler } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getMunicipiosByIdRoute } from "../routes/getById.ts";
import { toApiSuccess } from "@/shared/mapper.ts";
import { getMunicipioByIdService } from "../services/getById.ts";

export const getMunicipioByIdHandler: RouteHandler<
  typeof getMunicipiosByIdRoute,
  AppEnv
> = async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  const response = await getMunicipioByIdService(prisma, id);
  return c.json(toApiSuccess(response), 200);
};
