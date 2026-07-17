import { z } from "@hono/zod-openapi";

import { SucursalRawSchema, ClaveRawSchema } from "./raw.ts";

const ClaveInputSchema = z.object({
  identificador_id: ClaveRawSchema.shape.identificador_id,
  valor: ClaveRawSchema.shape.valor,
});

export const CreateSucursalSchema = SucursalRawSchema.omit({
  id: true,
  clave_signature: true,
})
  .extend({
    claves: z
      .array(ClaveInputSchema)
      .min(1, {
        message: "Debe proporcionar al menos una clave.",
      })
      .refine(
        (items) =>
          new Set(items.map((item) => item.identificador_id + "" + item.valor))
            .size === items.length,
        {
          message: "Las claves deben ser únicas.",
        },
      )
      .openapi({
        example: [
          { identificador_id: 1, valor: "34OA2" },
          { identificador_id: 2, valor: "AHOOW" },
        ],
        description: "Claves de la sucursal.",
      }),
  })
  .openapi({
    description: "Esquema para crear una nueva sucursal",
  });

export const UpdateSucursalSchema = CreateSucursalSchema.partial().openapi({
  description:
    "Esquema para actualizar una sucursal existente, permitiendo campos opcionales.",
});
