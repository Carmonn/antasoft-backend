import { z } from "@hono/zod-openapi";

import { UsuarioBasicRawSchema, UsuarioDetailRawSchema } from "./repository.ts";
import { PersonaDetailSchema } from "@/modules/personas/schemas/response.ts";
import {
  RolBasicSchema,
  RolDetailSchema,
} from "@/modules/usuarios/roles/schemas/response.ts";
import { PermisoBasicSchema } from "@/modules/catalogos/permisos/schemas/response.ts";

export const UsuarioBasicSchema = UsuarioBasicRawSchema.omit({
  contrasena: true,
  rol_id: true,
  refresh_token: true,
})
  .extend({
    rol: RolBasicSchema,
    permisos: z.array(PermisoBasicSchema),
  })
  .openapi({
    description: "Informacion basica de un usuario.",
  });

export const UsuarioDetailSchema = UsuarioDetailRawSchema.omit({
  contrasena: true,
  rol_id: true,
  refresh_token: true,
})
  .extend({
    rol: RolDetailSchema,
    persona: PersonaDetailSchema,
    permisos: z.array(PermisoBasicSchema),
  })
  .openapi({
    description: "Informacion detallada de un usuario.",
  });

export const ListUsuarioBasicSchema = z.array(UsuarioBasicSchema).openapi({
  description: "Lista de usuarios disponibles.",
});

export const ListUsuarioDetailSchema = z.array(UsuarioDetailSchema).openapi({
  description: "Lista de usuarios con informacion detallada.",
});

// ----- Types -----
export type UsuarioBasic = z.infer<typeof UsuarioBasicSchema>;
export type UsuarioDetail = z.infer<typeof UsuarioDetailSchema>;
