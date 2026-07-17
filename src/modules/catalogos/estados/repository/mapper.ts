import { z } from "@hono/zod-openapi";

import type { EstadoBasicRaw, EstadoDetailRaw } from "./read.ts";
import { EstadoBasicSchema, EstadoDetailSchema } from "../schemas/response.ts";

/** Convierte el detalle raw del estado a respuesta pública. */
export const toEstadoBasic = (
  estadoRaw: EstadoBasicRaw,
): z.infer<typeof EstadoBasicSchema> => {
  return {
    ...estadoRaw,
  };
};
export const toEstadoDetail = (
  estadoRaw: EstadoDetailRaw,
): z.infer<typeof EstadoDetailSchema> => {
  return {
    ...estadoRaw,
    municipios: estadoRaw.municipios.map(
      ({ estado_id: _estadoId, ...municipio }) => municipio,
    ),
  };
};
