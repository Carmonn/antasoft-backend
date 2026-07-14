import { z } from "@hono/zod-openapi";

import { PersonaBasicRawSchema, PersonaDetailRawSchema } from "./repository.ts";
import { EstadoDetailSchema } from "@/modules/catalogos/estados/schemas/response.ts";

export const PersonaBasicSchema = PersonaBasicRawSchema.extend({
  contactos: z.array(
    PersonaBasicRawSchema.shape.contactos.element.omit({
      persona_id: true,
      medio_id: true,
    }),
  ),
}).openapi({
  description: "Informacion basica de una persona.",
});

export const PersonaDetailSchema = PersonaDetailRawSchema.extend({
  contactos: z.array(
    PersonaBasicRawSchema.shape.contactos.element.omit({
      persona_id: true,
      medio_id: true,
    }),
  ),
  cobertura: z.array(EstadoDetailSchema),
}).openapi({
  description: "Informacion detallada de una persona.",
});

export const ListPersonaBasicSchema = z.array(PersonaBasicSchema).openapi({
  description: "Lista de personas disponibles.",
});

export const ListPersonaDetailSchema = z.array(PersonaDetailSchema).openapi({
  description: "Lista de personas disponibles con informacion detallada.",
});

// ----- Types -----
export type PersonaBasic = z.infer<typeof PersonaBasicSchema>;
export type PersonaDetail = z.infer<typeof PersonaDetailSchema>;
