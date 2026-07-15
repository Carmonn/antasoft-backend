import { z } from "@hono/zod-openapi";

import { PersonaRawSchema } from "./raw.ts";

const ContactoInputSchema = z.object({
  medio_id: z.coerce.number().int().positive().openapi({
    example: 1,
    description: "Identificador del medio de contacto.",
  }),
  valor: z.string().trim().min(1).openapi({
    example: "5516766158",
    description: "Valor del medio de contacto.",
  }),
});

const CoberturaInputSchema = z.coerce.number().int().positive().openapi({
  example: 1,
  description: "Identificador del municipio dentro de la cobertura.",
});

export const CreatePersonaSchema = PersonaRawSchema.omit({ id: true })
  .extend({
    medios_de_contacto: z
      .array(ContactoInputSchema)
      .min(1, {
        message: "Debe proporcionar al menos un medio de contacto.",
      })
      .refine(
        (items) =>
          new Set(items.map((item) => item.medio_id + "" + item.valor)).size ===
          items.length,
        {
          message: "Los medios de contacto deben ser únicos.",
        },
      )
      .openapi({
        example: [
          { medio_id: 1, valor: "5516766158" },
          { medio_id: 2, valor: "contacto@gmail.com" },
        ],
        description: "Medios de contacto de la persona.",
      }),
    cobertura: z
      .array(CoberturaInputSchema)
      .min(1, {
        message: "La cobertura debe contener al menos un municipio.",
      })
      .refine((items) => new Set(items).size === items.length, {
        message:
          "Los identificadores de municipios en la cobertura deben ser únicos.",
      })
      .openapi({
        example: [1, 2, 3],
        description: "Identificadores de municipios en la cobertura.",
      }),
  })
  .openapi({
    description:
      "Esquema para crear una nueva persona, incluyendo sus medios de contacto y cobertura.",
  });

export const UpdatePersonaSchema = CreatePersonaSchema.partial().openapi({
  description:
    "Esquema para actualizar una persona existente, permitiendo campos opcionales.",
});
