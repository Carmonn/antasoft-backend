import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppEnv } from "@/main.ts";

import { getAllMunicipiosRoute } from "./getAll.ts";
import { getMunicipiosByIdRoute } from "./getById.ts";

import { listMunicipiosHandler } from "../handlers/index.ts";
import { getMunicipioByIdHandler } from "../handlers/index.ts";

const municipiosRoutes = new OpenAPIHono<AppEnv>();

//----- GET allMunicipios -----
municipiosRoutes.openapi(getAllMunicipiosRoute, listMunicipiosHandler);

//----- GET muncipioById -----
municipiosRoutes.openapi(getMunicipiosByIdRoute, getMunicipioByIdHandler);

export default municipiosRoutes;
