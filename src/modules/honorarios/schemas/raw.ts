import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const HonorarioRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del honorario.",
  }),
  asignacion_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la asignacion.",
  }),
  persona_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la persona.",
  }),
  estatus_honorario_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del estatus del honorario.",
  }),
  fecha_solicitud: z.date().openapi({
    example: new Date("1990-01-01"),
    description: "Fecha de la solicitud del honorario.",
  }),
  fecha_resolucion: z
    .date()
    .nullable()
    .openapi({
      example: new Date("1990-01-01"),
      description: "Fecha de la resolución del honorario.",
    }),
}) satisfies z.ZodType<Prisma.honorariosModel>;

// ----- Types -----
export type HonorarioRaw = z.infer<typeof HonorarioRawSchema>;
