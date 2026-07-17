import { z } from "@hono/zod-openapi";

import { SucursalRawSchema, ClaveRawSchema } from "./raw.ts";

import { ClienteDetailRawSchema } from "@/modules/sucursales/clientes/schemas/repository.ts";
import { MunicipioDetailRawSchema } from "@/modules/catalogos/municipios/schemas/repository.ts";
import { IdentificadorRawSchema } from "@/modules/sucursales/clientes/schemas/raw.ts";

// ----- Repository response read Schemas -----
export const SucursalBasicRawSchema = SucursalRawSchema;

export const SucursalDetailRawSchema = SucursalRawSchema.extend({
  municipio: MunicipioDetailRawSchema,
  cliente: ClienteDetailRawSchema,
  claves: z.array(
    ClaveRawSchema.extend({
      identificador: IdentificadorRawSchema,
    }),
  ),
});

// ----- Types -----
export type SucursalBasicRaw = z.infer<typeof SucursalBasicRawSchema>;
export type SucursalDetailRaw = z.infer<typeof SucursalDetailRawSchema>;
