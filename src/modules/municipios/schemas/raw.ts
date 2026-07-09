import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const MunicipioRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del estado.",
  }),
  estado_id: z.number().int().positive().openapi({
    example: 1,
    description:
      "Identificador unico del estado al que pertenece el municipio.",
  }),
  clave: z.number().int().positive().openapi({
    example: 1,
    description: "Clave unica del municipio.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "AGUASCALIENTES",
    description: "Nombre del municipio.",
  }),
}) satisfies z.ZodType<Prisma.municipiosModel>;
