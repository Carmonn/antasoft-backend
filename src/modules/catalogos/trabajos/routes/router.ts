import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllTrabajosRoute } from "./getAll.ts";
import { getTrabajosByIdRoute } from "./getById.ts";

import { listTrabajosHandler } from "../handlers/index.ts";
import { getTrabajoByIdHandler } from "../handlers/index.ts";

const trabajosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allTrabajos -----
trabajosRoutes.openapi(getAllTrabajosRoute, listTrabajosHandler);

//----- GET trabajoById -----
trabajosRoutes.openapi(getTrabajosByIdRoute, getTrabajoByIdHandler);

export default trabajosRoutes;
