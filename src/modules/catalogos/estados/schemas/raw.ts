import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const EstadoRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del estado.",
  }),
  clave: z.number().int().positive().openapi({
    example: 1,
    description: "Clave unica del estado.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "AGUASCALIENTES",
    description: "Nombre del estado.",
  }),
  abreviatura: z.string().trim().min(1).openapi({
    example: "AGS.",
    description: "Abreviatura del estado.",
  }),
}) satisfies z.ZodType<Prisma.estadosModel>;
