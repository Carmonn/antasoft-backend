import { z } from "@hono/zod-openapi";

import {
  HonorarioBasicRawSchema,
  HonorarioDetailRawSchema,
} from "./repository.ts";

import { AsignacionDetailSchema } from "@/modules/asignaciones/schemas/response.ts";
import { PersonaDetailSchema } from "@/modules/personas/schemas/response.ts";
import { EstatusHonorarioBasicSchema } from "@/modules/catalogos/estatusHonorarios/schemas/response.ts";

export const HonorarioBasicSchema = HonorarioBasicRawSchema.omit({}).openapi({
  description: "Informacion basica de un honorario.",
});

export const HonorarioDetailSchema = HonorarioDetailRawSchema.omit({
  persona_id: true,
  asignacion_id: true,
  estatus_honorario_id: true,
})
  .extend({
    persona: PersonaDetailSchema,
    asignacion: AsignacionDetailSchema,
    estatus_honorario: EstatusHonorarioBasicSchema,
  })
  .openapi({
    description: "Informacion detallada de un honorario.",
  });

export const ListHonorarioBasicSchema = z.array(HonorarioBasicSchema).openapi({
  description: "Lista de honorarios disponibles.",
});

export const ListHonorarioDetailSchema = z
  .array(HonorarioDetailSchema)
  .openapi({
    description: "Lista de honorarios con informacion detallada.",
  });

// ----- Types -----
export type HonorarioBasic = z.infer<typeof HonorarioBasicSchema>;
export type HonorarioDetail = z.infer<typeof HonorarioDetailSchema>;
