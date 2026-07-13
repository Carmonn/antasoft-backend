import { z } from "@hono/zod-openapi";
import { MedioBasicRawSchema } from "./repository.ts";

export const MedioBasicSchema = MedioBasicRawSchema.openapi({
  description: "Informacion basica de un medio.",
});

export const ListMedioBasicSchema = z.array(MedioBasicSchema).openapi({
  description: "Lista de medios disponibles.",
});
