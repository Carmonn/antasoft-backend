import { z } from "@hono/zod-openapi";

import { RolBasicRawSchema, RolDetailRawSchema } from "./repository.ts";
import { PermisoBasicSchema } from "@/modules/catalogos/permisos/schemas/response.ts";

export const RolBasicSchema = RolBasicRawSchema.omit({
  asignable: true,
}).openapi({
  description: "Informacion basica de un rol.",
});

export const RolDetailSchema = RolDetailRawSchema.omit({ asignable: true })
  .extend({
    permisos: z.array(PermisoBasicSchema),
  })
  .openapi({
    description: "Informacion detallada de un rol.",
  });

export const ListRolBasicSchema = z.array(RolBasicSchema).openapi({
  description: "Lista de roles disponibles.",
});

export const ListRolDetailSchema = z.array(RolDetailSchema).openapi({
  description: "Lista de roles disponibles con informacion detallada.",
});

// ----- Types -----
export type RolBasic = z.infer<typeof RolBasicSchema>;
export type RolDetail = z.infer<typeof RolDetailSchema>;
