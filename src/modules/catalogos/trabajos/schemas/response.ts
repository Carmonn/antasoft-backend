import { z } from "@hono/zod-openapi";
import { TrabajoBasicRawSchema } from "./repository.ts";

export const TrabajoBasicSchema = TrabajoBasicRawSchema.openapi({
  description: "Informacion basica de un trabajo.",
});

export const ListTrabajoBasicSchema = z.array(TrabajoBasicSchema).openapi({
  description: "Lista de trabajos disponibles.",
});
