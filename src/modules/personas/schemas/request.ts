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
      .refine(
        (items) =>
          new Set(items.map((item) => item.medio_id + "" + item.valor)).size ===
          items.length,
        {
          message: "Los medios de contacto deben ser únicos.",
        },
      ),
    cobertura: z
      .array(CoberturaInputSchema)
      .refine((items) => new Set(items).size === items.length, {
        message:
          "Los identificadores de municipios en la cobertura deben ser únicos.",
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
