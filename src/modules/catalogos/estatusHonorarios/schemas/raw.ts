import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const EstatusHonorarioRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del estatus de honorario.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "Completo",
    description: "Nombre del estatus de honorario.",
  }),
}) satisfies z.ZodType<Prisma.estatus_honorariosModel>;
