import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllEstatusHonorariosRoute } from "./getAll.ts";
import { getEstatusHonorariosByIdRoute } from "./getById.ts";

import { listEstatusHonorariosHandler } from "../handlers/index.ts";
import { getEstatusHonorarioByIdHandler } from "../handlers/index.ts";

const estatusHonorariosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allHonorarios -----
estatusHonorariosRoutes.openapi(
  getAllEstatusHonorariosRoute,
  listEstatusHonorariosHandler,
);

//----- GET HonorarioById -----
estatusHonorariosRoutes.openapi(
  getEstatusHonorariosByIdRoute,
  getEstatusHonorarioByIdHandler,
);

export default estatusHonorariosRoutes;
