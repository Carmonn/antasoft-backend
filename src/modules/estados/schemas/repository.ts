import { z } from "@hono/zod-openapi";
import { EstadoRawSchema } from "./raw.ts";
import { MunicipioRawSchema } from "@/modules/municipios/schemas/raw.ts";

// ----- Repository response read Schemas -----
export const EstadoBasicRawSchema = EstadoRawSchema;
export const EstadoDetailRawSchema = EstadoRawSchema.extend({
  municipios: z.array(MunicipioRawSchema),
});
