import { z } from "@hono/zod-openapi";

import type {
  UsuarioBasicRaw,
  UsuarioDetailRaw,
} from "../schemas/repository.ts";

import {
  UsuarioBasicSchema,
  UsuarioDetailSchema,
} from "../schemas/response.ts";

import { toPersonaDetail } from "@/modules/personas/repository/mapper.ts";

import {
  toRolBasic,
  toRolDetail,
} from "@/modules/usuarios/roles/repository/mapper.ts";
import { toPermisoBasic } from "@/modules/catalogos/permisos/repository/mapper.ts";

/** Convierte UsuarioBasicRaw a una respuesta pública. */
export const toUsuarioBasic = (
  usuarioRaw: UsuarioBasicRaw,
): z.infer<typeof UsuarioBasicSchema> => {
  const {
    contrasena: _,
    refresh_token: __,
    rol_id: ___,
    rol: rolRaw,
    permisos: permisosRaw,
    ...usuario
  } = usuarioRaw;

  const rol = toRolBasic(rolRaw);
  const permisos = permisosRaw.map((permisoRaw) =>
    toPermisoBasic(permisoRaw.permiso),
  );

  return { ...usuario, rol, permisos };
};

/** Convierte UsuarioDetailRaw a una respuesta pública. */
export const toUsuarioDetail = (
  usuarioRaw: UsuarioDetailRaw,
): z.infer<typeof UsuarioDetailSchema> => {
  const {
    contrasena: _,
    refresh_token: __,
    rol_id: ___,
    persona: personaRaw,
    rol: rolRaw,
    permisos: permisosRaw,
    ...usuario
  } = usuarioRaw;

  const persona = toPersonaDetail(personaRaw);
  const rol = toRolDetail(rolRaw);
  const permisos = permisosRaw.map((permisoRaw) =>
    toPermisoBasic(permisoRaw.permiso),
  );

  return { ...usuario, persona, rol, permisos };
};
