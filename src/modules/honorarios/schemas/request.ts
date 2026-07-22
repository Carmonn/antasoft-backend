import { z } from "@hono/zod-openapi";

import { HonorarioRawSchema } from "./raw.ts";

export const CreateHonorarioSchema = HonorarioRawSchema.omit({
  id: true,
  fecha_solicitud: true,
  fecha_resolucion: true,
}).openapi({
  description: "Esquema para crear un nuevo honorario.",
});

export const UpdateHonorarioSchema = CreateHonorarioSchema.partial().openapi({
  description:
    "Esquema para actualizar un honorario existente, permitiendo campos opcionales.",
});
