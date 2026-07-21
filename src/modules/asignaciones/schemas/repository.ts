import { z } from "@hono/zod-openapi";

import { AsignacionRawSchema } from "./raw.ts";

import { SucursalDetailRawSchema } from "@/modules/sucursales/sucursales/schemas/repository.ts";
import { UsuarioDetailRawSchema } from "@/modules/usuarios/usuarios/schemas/repository.ts";
import { TrabajoBasicRawSchema } from "@/modules/catalogos/trabajos/schemas/repository.ts";
import { EstatusAsignacionBasicRawSchema } from "@/modules/catalogos/estatusAsignaciones/schemas/repository.ts";

// ----- Repository response read Schemas -----
export const AsignacionBasicRawSchema = AsignacionRawSchema;

export const AsignacionDetailRawSchema = AsignacionRawSchema.extend({
  sucursal: SucursalDetailRawSchema,
  usuario_asignado: UsuarioDetailRawSchema,
  usuario_responsable: UsuarioDetailRawSchema,
  trabajo: TrabajoBasicRawSchema,
  estatus_asignacion: EstatusAsignacionBasicRawSchema,
});

// ----- Types -----
export type AsignacionBasicRaw = z.infer<typeof AsignacionBasicRawSchema>;
export type AsignacionDetailRaw = z.infer<typeof AsignacionDetailRawSchema>;
