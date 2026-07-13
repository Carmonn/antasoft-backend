import { z } from "@hono/zod-openapi";

import type { EstadoDetailRaw } from "./read.ts";
import { EstadoDetailSchema } from "../schemas/response.ts";

/** Convierte el detalle raw del estado a respuesta pública. */
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
