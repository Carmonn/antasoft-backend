import { z } from "@hono/zod-openapi";

import { RolRawSchema, RolPermisoRawSchema } from "./raw.ts";
import { PermisoRawSchema } from "@/modules/catalogos/permisos/schemas/raw.ts";

// ----- Repository response read Schemas -----
export const RolBasicRawSchema = RolRawSchema;

export const RolDetailRawSchema = RolRawSchema.extend({
  permisos: z.array(
    RolPermisoRawSchema.extend({
      permiso: PermisoRawSchema,
    }),
  ),
});

// ----- Types -----
export type RolBasicRaw = z.infer<typeof RolBasicRawSchema>;
export type RolDetailRaw = z.infer<typeof RolDetailRawSchema>;
