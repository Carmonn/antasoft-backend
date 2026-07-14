import { z } from "@hono/zod-openapi";

import type { RolBasicRaw, RolDetailRaw } from "../schemas/repository.ts";

import { RolBasicSchema, RolDetailSchema } from "../schemas/response.ts";

/** Convierte RolBasicRaw a una respuesta pública. */
export const toRolBasic = (
  rolRaw: RolBasicRaw,
): z.infer<typeof RolBasicSchema> => {
  const { asignable: _, ...rol } = rolRaw;
  return { ...rol };
};

/** Convierte RolDetailRaw a una respuesta pública. */
export const toRolDetail = (
  rolRaw: RolDetailRaw,
): z.infer<typeof RolDetailSchema> => {
  const { asignable: _, permisos: permisosRaw, ...rol } = rolRaw;
  const permisos = permisosRaw.map((permisoRaw) => {
    const { asignable: ___, ...permisoBasic } = permisoRaw.permiso;
    return permisoBasic;
  });

  return { ...rol, permisos };
};
