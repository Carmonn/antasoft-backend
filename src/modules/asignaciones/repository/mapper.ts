import { z } from "@hono/zod-openapi";

import type {
  AsignacionBasicRaw,
  AsignacionDetailRaw,
} from "../schemas/repository.ts";

import {
  AsignacionBasicSchema,
  AsignacionDetailSchema,
} from "../schemas/response.ts";

import { toSucursalDetail } from "@/modules/sucursales/sucursales/repository/mapper.ts";
import { toUsuarioDetail } from "@/modules/usuarios/usuarios/repository/mapper.ts";
import { toTrabajoBasic } from "@/modules/catalogos/trabajos/repository/mapper.ts";
import { toEstatusAsignacionBasic } from "@/modules/catalogos/estatusAsignaciones/repository/mapper.ts";

/** Convierte AsignacionBasicRaw a una respuesta pública. */
export const toAsignacionBasic = (
  asignacionRaw: AsignacionBasicRaw,
): z.infer<typeof AsignacionBasicSchema> => {
  const { ...asignacion } = asignacionRaw;
  return { ...asignacion };
};

/** Convierte AsignacionDetailRaw a una respuesta pública. */
export const toAsignacionDetail = (
  asignacionRaw: AsignacionDetailRaw,
): z.infer<typeof AsignacionDetailSchema> => {
  const {
    usuario_responsable_id: _,
    usuario_asignado_id: __,
    trabajo_id: ___,
    estatus_asignacion_id: ____,
    sucursal_id: _____,
    sucursal: sucursalRaw,
    usuario_responsable: usuarioResponsableRaw,
    usuario_asignado: usuarioAsignadoRaw,
    trabajo: trabajoRaw,
    estatus_asignacion: estatusAsignacionRaw,
    ...asignacion
  } = asignacionRaw;

  const sucursal = toSucursalDetail(sucursalRaw);
  const usuario_responsable = toUsuarioDetail(usuarioResponsableRaw);
  const usuario_asignado = toUsuarioDetail(usuarioAsignadoRaw);
  const trabajo = toTrabajoBasic(trabajoRaw);
  const estatus_asignacion = toEstatusAsignacionBasic(estatusAsignacionRaw);

  return {
    ...asignacion,
    sucursal,
    usuario_responsable,
    usuario_asignado,
    trabajo,
    estatus_asignacion,
  };
};
