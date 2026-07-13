import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const TrabajoRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del trabajo.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "Licencia de funcionamiento",
    description: "Nombre del trabajo.",
  }),
}) satisfies z.ZodType<Prisma.trabajosModel>;
