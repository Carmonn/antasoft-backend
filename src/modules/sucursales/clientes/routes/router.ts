import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllClientesRoute } from "./getAll.ts";
import { getClientesByIdRoute } from "./getById.ts";
import { createClientesRoute } from "./create.ts";
import { updateClientesRoute } from "./update.ts";
import { deleteClientesRoute } from "./delete.ts";

import {
  listClientesHandler,
  getClienteByIdHandler,
  createClientesHandler,
  updateClientesHandler,
  deleteClientesHandler,
} from "../handlers/index.ts";

const clientesRoutes = new OpenAPIHono<AppEnv>();

//----- GET allClientes -----
clientesRoutes.openapi(getAllClientesRoute, listClientesHandler);

//----- GET clienteById -----
clientesRoutes.openapi(getClientesByIdRoute, getClienteByIdHandler);

//---------- POST createCliente ----------
clientesRoutes.openapi(createClientesRoute, createClientesHandler);

//---------- UPDATE updateCliente ----------
clientesRoutes.openapi(updateClientesRoute, updateClientesHandler);

//---------- DELETE deleteCliente ----------
clientesRoutes.openapi(deleteClientesRoute, deleteClientesHandler);

export default clientesRoutes;
