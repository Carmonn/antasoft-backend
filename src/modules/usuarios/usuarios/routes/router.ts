import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllUsuariosRoute } from "./getAll.ts";
import { getUsuariosByIdRoute } from "./getById.ts";
import { createUsuariosRoute } from "./create.ts";
import { updateUsuariosRoute } from "./update.ts";
import { deleteUsuarioRoute } from "./delete.ts";

import {
  listUsuariosHandler,
  getUsuarioByIdHandler,
  createUsuariosHandler,
  deleteUsuariosHandler,
  updateUsuariosHandler,
} from "../handlers/index.ts";

const usuariosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allUsuarios -----
usuariosRoutes.openapi(getAllUsuariosRoute, listUsuariosHandler);

//----- GET usuarioById -----
usuariosRoutes.openapi(getUsuariosByIdRoute, getUsuarioByIdHandler);

//---------- POST createUsuario ----------
usuariosRoutes.openapi(createUsuariosRoute, createUsuariosHandler);

//---------- UPDATE updateUsuario ----------
usuariosRoutes.openapi(updateUsuariosRoute, deleteUsuariosHandler);

//---------- DELETE deleteUsuario ----------
usuariosRoutes.openapi(deleteUsuarioRoute, updateUsuariosHandler);

export default usuariosRoutes;
