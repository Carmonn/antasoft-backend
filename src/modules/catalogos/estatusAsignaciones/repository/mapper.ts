import { z } from "@hono/zod-openapi";

import type { EstatusAsignacionBasicRaw } from "./read.ts";
import { EstatusAsignacionBasicSchema } from "../schemas/response.ts";

/** Convierte el detalle raw del estatus de asignacion a respuesta pública. */
export const toEstatusAsignacionBasic = (
  estatusAsignacionRaw: EstatusAsignacionBasicRaw,
): z.infer<typeof EstatusAsignacionBasicSchema> => {
  return { ...estatusAsignacionRaw };
};
