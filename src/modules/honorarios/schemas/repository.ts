import { z } from "@hono/zod-openapi";

import { HonorarioRawSchema } from "./raw.ts";

import { PersonaDetailRawSchema } from "@/modules/personas/schemas/repository.ts";
import { AsignacionDetailRawSchema } from "@/modules/asignaciones/schemas/repository.ts";
import { EstatusHonorarioBasicRawSchema } from "@/modules/catalogos/estatusHonorarios/schemas/repository.ts";

// ----- Repository response read Schemas -----
export const HonorarioBasicRawSchema = HonorarioRawSchema;

export const HonorarioDetailRawSchema = HonorarioRawSchema.extend({
  persona: PersonaDetailRawSchema,
  asignacion: AsignacionDetailRawSchema,
  estatus_honorario: EstatusHonorarioBasicRawSchema,
});

// ----- Types -----
export type HonorarioBasicRaw = z.infer<typeof HonorarioBasicRawSchema>;
export type HonorarioDetailRaw = z.infer<typeof HonorarioDetailRawSchema>;
