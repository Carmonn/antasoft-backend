import { z } from "@hono/zod-openapi";

import { ClienteRawSchema, IdentificadorRawSchema } from "./raw.ts";

export const CreateClienteSchema = ClienteRawSchema.omit({
  id: true,
})
  .extend({
    identificadores: z
      .array(IdentificadorRawSchema.shape.nombre)
      .refine((items) => new Set(items).size === items.length, {
        message: "Los nombres de identificadores deben ser únicos.",
      })
      .openapi({
        example: ["SIRH", "BUILDING CODE"],
        description: "Nombre del identificador.",
      }),
  })
  .openapi({
    description: "Esquema para crear un nuevo cliente",
  });

export const UpdateClienteSchema = CreateClienteSchema.partial().openapi({
  description:
    "Esquema para actualizar un cliente existente, permitiendo campos opcionales.",
});
