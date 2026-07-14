import { z } from "@hono/zod-openapi";

import {
  PersonaRawSchema,
  ContactoRawSchema,
  PersonaMunicipioRawSchema,
} from "./raw.ts";
import { MedioRawSchema } from "@/modules/catalogos/medios/schemas/raw.ts";
import { MunicipioRawSchema } from "@/modules/catalogos/municipios/schemas/raw.ts";
import { EstadoRawSchema } from "@/modules/catalogos/estados/schemas/raw.ts";

// ----- Repository response read Schemas -----
export const PersonaBasicRawSchema = PersonaRawSchema.extend({
  contactos: z.array(ContactoRawSchema.extend({ medio: MedioRawSchema })),
});

export const PersonaDetailRawSchema = PersonaRawSchema.extend({
  contactos: z.array(ContactoRawSchema.extend({ medio: MedioRawSchema })),
  cobertura: z.array(
    PersonaMunicipioRawSchema.extend({
      municipio: MunicipioRawSchema.extend({ estado: EstadoRawSchema }),
    }),
  ),
});

// ----- Types -----
export type PersonaBasicRaw = z.infer<typeof PersonaBasicRawSchema>;
export type PersonaDetailRaw = z.infer<typeof PersonaDetailRawSchema>;
