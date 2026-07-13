import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllPermisosRoute } from "./getAll.ts";
import { getPermisosByIdRoute } from "./getById.ts";

import { listPermisosHandler } from "../handlers/index.ts";
import { getPermisoByIdHandler } from "../handlers/index.ts";

const permisosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allPermisos -----
permisosRoutes.openapi(getAllPermisosRoute, listPermisosHandler);

//----- GET permisoById -----
permisosRoutes.openapi(getPermisosByIdRoute, getPermisoByIdHandler);

export default permisosRoutes;
