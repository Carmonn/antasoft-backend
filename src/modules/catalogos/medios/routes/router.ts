import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllMediosRoute } from "./getAll.ts";
import { getMediosByIdRoute } from "./getById.ts";

import { listMediosHandler } from "../handlers/index.ts";
import { getMedioByIdHandler } from "../handlers/index.ts";

const mediosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allMedios -----
mediosRoutes.openapi(getAllMediosRoute, listMediosHandler);

//----- GET medioById -----
mediosRoutes.openapi(getMediosByIdRoute, getMedioByIdHandler);

export default mediosRoutes;
