import { z } from "@hono/zod-openapi";

import type { MunicipioBasicRaw, MunicipioDetailRaw } from "./read.ts";
import {
  MunicipioBasicSchema,
  MunicipioDetailSchema,
} from "../schemas/response.ts";

/** Convierte el detalle raw del municipio a respuesta pública. */
export const toMunicipioBasic = (
  municipioRaw: MunicipioBasicRaw,
): z.infer<typeof MunicipioBasicSchema> => {
  return { ...municipioRaw };
};

/** Convierte el detalle raw del municipio a respuesta pública. */
export const toMunicipioDetail = (
  municipioRaw: MunicipioDetailRaw,
): z.infer<typeof MunicipioDetailSchema> => {
  const { estado_id: _, ...municipio } = municipioRaw;
  return municipio;
};
