import { z } from "@hono/zod-openapi";

import { UsuarioRawSchema, UsuarioPermisoRawSchema } from "./raw.ts";
import { PersonaDetailRawSchema } from "@/modules/personas/schemas/repository.ts";
import {
  RolBasicRawSchema,
  RolDetailRawSchema,
} from "@/modules/usuarios/roles/schemas/repository.ts";
import { PermisoRawSchema } from "@/modules/catalogos/permisos/schemas/raw.ts";

// ----- Repository response read Schemas -----
export const UsuarioBasicRawSchema = UsuarioRawSchema.extend({
  rol: RolBasicRawSchema,
  permisos: z.array(
    UsuarioPermisoRawSchema.extend({
      permiso: PermisoRawSchema,
    }),
  ),
});

export const UsuarioDetailRawSchema = UsuarioRawSchema.extend({
  rol: RolDetailRawSchema,
  persona: PersonaDetailRawSchema,
  permisos: z.array(
    UsuarioPermisoRawSchema.extend({
      permiso: PermisoRawSchema,
    }),
  ),
});

// ----- Types -----
export type UsuarioBasicRaw = z.infer<typeof UsuarioBasicRawSchema>;
export type UsuarioDetailRaw = z.infer<typeof UsuarioDetailRawSchema>;
