import { z } from "@hono/zod-openapi";

import {
  AsignacionBasicRawSchema,
  AsignacionDetailRawSchema,
} from "./repository.ts";

import { SucursalDetailSchema } from "@/modules/sucursales/sucursales/schemas/response.ts";
import { UsuarioDetailSchema } from "@/modules/usuarios/usuarios/schemas/response.ts";
import { TrabajoBasicSchema } from "@/modules/catalogos/trabajos/schemas/response.ts";
import { EstatusAsignacionBasicSchema } from "@/modules/catalogos/estatusAsignaciones/schemas/response.ts";

export const AsignacionBasicSchema = AsignacionBasicRawSchema.omit({}).openapi({
  description: "Informacion basica de una asignación.",
});

export const AsignacionDetailSchema = AsignacionDetailRawSchema.omit({
  usuario_responsable_id: true,
  usuario_asignado_id: true,
  trabajo_id: true,
  estatus_asignacion_id: true,
  sucursal_id: true,
})
  .extend({
    sucursal: SucursalDetailSchema,
    usuario_asignado: UsuarioDetailSchema,
    usuario_responsable: UsuarioDetailSchema,
    trabajo: TrabajoBasicSchema,
    estatus_asignacion: EstatusAsignacionBasicSchema,
  })
  .openapi({
    description: "Informacion detallada de una asignación.",
  });

export const ListAsignacionBasicSchema = z
  .array(AsignacionBasicSchema)
  .openapi({
    description: "Lista de asignaciones disponibles.",
  });

export const ListAsignacionDetailSchema = z
  .array(AsignacionDetailSchema)
  .openapi({
    description: "Lista de asignaciones con informacion detallada.",
  });

// ----- Types -----
export type AsignacionBasic = z.infer<typeof AsignacionBasicSchema>;
export type AsignacionDetail = z.infer<typeof AsignacionDetailSchema>;
