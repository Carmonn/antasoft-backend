import { MunicipioRawSchema } from "./raw.ts";
import { EstadoRawSchema } from "@/modules/estados/schemas/raw.ts";

// ----- Repository response read Schemas -----
export const MunicipioBasicRawSchema = MunicipioRawSchema;
export const MunicipioDetailRawSchema = MunicipioRawSchema.extend({
  estado: EstadoRawSchema,
});
