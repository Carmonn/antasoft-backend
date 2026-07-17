import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllSucursalesRoute } from "./getAll.ts";
import { getSucursalesByIdRoute } from "./getById.ts";
import { createSucursalesRoute } from "./create.ts";
import { updateSucursalesRoute } from "./update.ts";
import { deleteSucursalesRoute } from "./delete.ts";

import {
  listSucursalesHandler,
  getSucursalByIdHandler,
  createSucursalesHandler,
  updateSucursalesHandler,
  deleteSucursalesHandler,
} from "../handlers/index.ts";

const sucursalesRoutes = new OpenAPIHono<AppEnv>();

//----- GET allSucursales -----
sucursalesRoutes.openapi(getAllSucursalesRoute, listSucursalesHandler);

//----- GET sucursalById -----
sucursalesRoutes.openapi(getSucursalesByIdRoute, getSucursalByIdHandler);

//---------- POST createSucursal ----------
sucursalesRoutes.openapi(createSucursalesRoute, createSucursalesHandler);

//---------- UPDATE updateSucursal ----------
sucursalesRoutes.openapi(updateSucursalesRoute, updateSucursalesHandler);

//---------- DELETE deleteSucursal ----------
sucursalesRoutes.openapi(deleteSucursalesRoute, deleteSucursalesHandler);

export default sucursalesRoutes;
