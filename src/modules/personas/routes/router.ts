import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllPersonasRoute } from "./getAll.ts";
import { getPersonasByIdRoute } from "./getById.ts";
import { createPersonasRoute } from "./create.ts";
import { updatePersonasRoute } from "./update.ts";
import { deletePersonasRoute } from "./delete.ts";

import {
  listPersonasHandler,
  getPersonaByIdHandler,
  createPersonasHandler,
  deletePersonasHandler,
  updatePersonasHandler,
} from "../handlers/index.ts";

const personasRoutes = new OpenAPIHono<AppEnv>();

//----- GET allPersonas -----
personasRoutes.openapi(getAllPersonasRoute, listPersonasHandler);

//----- GET personaById -----
personasRoutes.openapi(getPersonasByIdRoute, getPersonaByIdHandler);

//---------- POST createPersona ----------
personasRoutes.openapi(createPersonasRoute, createPersonasHandler);

//---------- UPDATE updatePersona ----------
personasRoutes.openapi(updatePersonasRoute, updatePersonasHandler);

//---------- DELETE deletePersona ----------
personasRoutes.openapi(deletePersonasRoute, deletePersonasHandler);

export default personasRoutes;
