import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllAsignacionesRoute } from "./getAll.ts";
import { getAsignacionesByIdRoute } from "./getById.ts";
import { createAsignacionesRoute } from "./create.ts";
import { updateAsignacionesRoute } from "./update.ts";
import { deleteAsignacionesRoute } from "./delete.ts";

import {
  listAsignacionesHandler,
  getAsignacionByIdHandler,
  createAsignacionesHandler,
  updateAsignacionesHandler,
  deleteAsignacionesHandler,
} from "../handlers/index.ts";

const asignacionesRoutes = new OpenAPIHono<AppEnv>();

//----- GET allAsignaciones -----
asignacionesRoutes.openapi(getAllAsignacionesRoute, listAsignacionesHandler);

//----- GET asignacionById -----
asignacionesRoutes.openapi(getAsignacionesByIdRoute, getAsignacionByIdHandler);

//---------- POST createAsignacion ----------
asignacionesRoutes.openapi(createAsignacionesRoute, createAsignacionesHandler);

//---------- UPDATE updateAsignacion ----------
asignacionesRoutes.openapi(updateAsignacionesRoute, updateAsignacionesHandler);

//---------- DELETE deleteAsignacion ----------
asignacionesRoutes.openapi(deleteAsignacionesRoute, deleteAsignacionesHandler);

export default asignacionesRoutes;
