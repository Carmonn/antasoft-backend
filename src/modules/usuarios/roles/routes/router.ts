import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllRolesRoute } from "./getAll.ts";
import { getRolesByIdRoute } from "./getById.ts";
import { createRolesRoute } from "./create.ts";
import { updateRolesRoute } from "./update.ts";
import { deleteRolesRoute } from "./delete.ts";

import {
  listRolesHandler,
  getRolByIdHandler,
  createRolesHandler,
  deleteRolesHandler,
  updateRolesHandler,
} from "../handlers/index.ts";

const rolesRoutes = new OpenAPIHono<AppEnv>();

//----- GET allRoles -----
rolesRoutes.openapi(getAllRolesRoute, listRolesHandler);

//----- GET rolById -----
rolesRoutes.openapi(getRolesByIdRoute, getRolByIdHandler);

//---------- POST createRol ----------
rolesRoutes.openapi(createRolesRoute, createRolesHandler);

//---------- UPDATE updateRol ----------
rolesRoutes.openapi(updateRolesRoute, deleteRolesHandler);

//---------- DELETE deleteRol ----------
rolesRoutes.openapi(deleteRolesRoute, updateRolesHandler);

export default rolesRoutes;
