import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const MedioRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del medio.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "Teléfono",
    description: "Nombre del medio.",
  }),
}) satisfies z.ZodType<Prisma.mediosModel>;
