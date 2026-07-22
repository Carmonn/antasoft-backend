import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllHonorariosRoute } from "./getAll.ts";
import { getHonorariosByIdRoute } from "./getById.ts";
import { createHonorariosRoute } from "./create.ts";
import { updateHonorariosRoute } from "./update.ts";
import { deleteHonorariosRoute } from "./delete.ts";

import {
  listHonorariosHandler,
  getHonorarioByIdHandler,
  createHonorariosHandler,
  updateHonorariosHandler,
  deleteHonorariosHandler,
} from "../handlers/index.ts";

const honorariosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allHonorarios -----
honorariosRoutes.openapi(getAllHonorariosRoute, listHonorariosHandler);

//----- GET honorarioById -----
honorariosRoutes.openapi(getHonorariosByIdRoute, getHonorarioByIdHandler);

//---------- POST createHonorario ----------
honorariosRoutes.openapi(createHonorariosRoute, createHonorariosHandler);

//---------- UPDATE updateHonorario ----------
honorariosRoutes.openapi(updateHonorariosRoute, updateHonorariosHandler);

//---------- DELETE deleteHonorario ----------
honorariosRoutes.openapi(deleteHonorariosRoute, deleteHonorariosHandler);

export default honorariosRoutes;
