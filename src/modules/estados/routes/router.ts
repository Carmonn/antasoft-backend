import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllEstadosRoute } from "./getAll.ts";
import { getEstadosByIdRoute } from "./getById.ts";

import { listEstadosHandler } from "../handlers/index.ts";
import { getEstadoByIdHandler } from "../handlers/index.ts";

const estadosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allEstados -----
estadosRoutes.openapi(getAllEstadosRoute, listEstadosHandler);

//----- GET estadoById -----
estadosRoutes.openapi(getEstadosByIdRoute, getEstadoByIdHandler);

export default estadosRoutes;
