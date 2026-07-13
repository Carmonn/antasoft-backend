import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllEstatusAsignacionesRoute } from "./getAll.ts";
import { getEstatusAsignacionesByIdRoute } from "./getById.ts";

import { listEstatusAsignacionesHandler } from "../handlers/index.ts";
import { getEstatusAsignacionByIdHandler } from "../handlers/index.ts";

const estatusAsignacionesRoutes = new OpenAPIHono<AppEnv>();

//----- GET allTrabajos -----
estatusAsignacionesRoutes.openapi(
  getAllEstatusAsignacionesRoute,
  listEstatusAsignacionesHandler,
);

//----- GET trabajoById -----
estatusAsignacionesRoutes.openapi(
  getEstatusAsignacionesByIdRoute,
  getEstatusAsignacionByIdHandler,
);

export default estatusAsignacionesRoutes;
