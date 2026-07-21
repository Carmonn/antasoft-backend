import { z } from "@hono/zod-openapi";

import { AsignacionRawSchema } from "./raw.ts";

export const CreateAsignacionSchema = AsignacionRawSchema.omit({
  id: true,
  fecha_asignacion: true,
  fecha_completado: true,
}).openapi({
  description: "Esquema para crear una nueva asignación.",
});

export const UpdateAsignacionSchema = CreateAsignacionSchema.partial().openapi({
  description:
    "Esquema para actualizar una asignación existente, permitiendo campos opcionales.",
});
