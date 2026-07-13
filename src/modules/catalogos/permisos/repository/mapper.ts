import { z } from "@hono/zod-openapi";

import type { PermidoBasicRaw } from "./read.ts";
import { PermisoBasicSchema } from "../schemas/response.ts";

/** Convierte el detalle raw del permiso a respuesta pública. */
export const toPermisoBasic = (
  permisoRaw: PermidoBasicRaw,
): z.infer<typeof PermisoBasicSchema> => {
  const { asignable: _, ...permiso } = permisoRaw;
  return permiso;
};
