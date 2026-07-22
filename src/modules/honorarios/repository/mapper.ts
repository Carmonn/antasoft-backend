import { z } from "@hono/zod-openapi";

import type {
  HonorarioBasicRaw,
  HonorarioDetailRaw,
} from "../schemas/repository.ts";

import {
  HonorarioBasicSchema,
  HonorarioDetailSchema,
} from "../schemas/response.ts";

import { toPersonaDetail } from "@/modules/personas/repository/mapper.ts";
import { toAsignacionDetail } from "@/modules/asignaciones/repository/mapper.ts";
import { toEstatusHonorarioBasic } from "@/modules/catalogos/estatusHonorarios/repository/mapper.ts";

/** Convierte HonorarioBasicRaw a una respuesta pública. */
export const toHonorarioBasic = (
  honorarioRaw: HonorarioBasicRaw,
): z.infer<typeof HonorarioBasicSchema> => {
  const { ...honorario } = honorarioRaw;
  return { ...honorario };
};

/** Convierte HonorarioDetailRaw a una respuesta pública. */
export const toHonorarioDetail = (
  honorarioRaw: HonorarioDetailRaw,
): z.infer<typeof HonorarioDetailSchema> => {
  const {
    persona_id: _,
    asignacion_id: __,
    estatus_honorario_id: ___,
    persona: personaRaw,
    asignacion: asignacionRaw,
    estatus_honorario: estatusHonorarioRaw,
    ...honorario
  } = honorarioRaw;

  const persona = toPersonaDetail(personaRaw);
  const asignacion = toAsignacionDetail(asignacionRaw);
  const estatus_honorario = toEstatusHonorarioBasic(estatusHonorarioRaw);

  return {
    ...honorario,
    persona,
    asignacion,
    estatus_honorario,
  };
};
