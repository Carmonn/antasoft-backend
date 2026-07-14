import { z } from "@hono/zod-openapi";

import { RolRawSchema } from "./raw.ts";

export const CreateRolSchema = RolRawSchema.omit({
  id: true,
  asignable: true,
})
  .extend({
    permisos: z
      .array(z.coerce.number().int().positive())
      .refine((items) => new Set(items).size === items.length, {
        message: "Los identificadores de permisos deben ser únicos.",
      })
      .openapi({
        example: 1,
        description: "Identificador del permiso.",
      }),
  })
  .openapi({
    description: "Esquema para crear un nuevo rol",
  });

export const UpdateRolSchema = CreateRolSchema.partial().openapi({
  description:
    "Esquema para actualizar un rol existente, permitiendo campos opcionales.",
});
