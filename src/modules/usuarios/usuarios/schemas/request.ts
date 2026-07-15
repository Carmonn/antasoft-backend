import { z } from "@hono/zod-openapi";

import { UsuarioRawSchema } from "./raw.ts";

export const CreateUsuarioSchema = UsuarioRawSchema.omit({
  id: true,
  fecha_acceso: true,
  refresh_token: true,
})
  .extend({
    permisos: z
      .array(z.coerce.number().int().positive())
      .refine((items) => new Set(items).size === items.length, {
        message: "Los identificadores de permisos deben ser únicos.",
      })
      .openapi({
        example: [1, 2, 3],
        description: "Identificador del permiso.",
      }),
  })
  .openapi({
    description: "Esquema para crear un nuevo usuario",
  });

export const UpdateUsuarioSchema = CreateUsuarioSchema.partial().openapi({
  description:
    "Esquema para actualizar un usuario existente, permitiendo campos opcionales.",
});
