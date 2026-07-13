import { z } from "@hono/zod-openapi";

import type { MunicipioDetailRaw } from "./read.ts";
import { MunicipioDetailSchema } from "../schemas/response.ts";

/** Convierte el detalle raw del municipio a respuesta pública. */
export const toMunicipioDetail = (
  municipioRaw: MunicipioDetailRaw,
): z.infer<typeof MunicipioDetailSchema> => {
  const { estado_id: _, ...municipio } = municipioRaw;
  return municipio;
};
