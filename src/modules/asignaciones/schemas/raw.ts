import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const AsignacionRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la asignacion.",
  }),
  usuario_responsable_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del usuario responsable.",
  }),
  usuario_asignado_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del usuario asignado.",
  }),
  trabajo_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del trabajo.",
  }),
  sucursal_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la sucursal.",
  }),
  estatus_asignacion_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del estatus de la asignacion.",
  }),
  fecha_asignacion: z.date().openapi({
    example: new Date("1990-01-01"),
    description: "Fecha de la asignacion.",
  }),
  fecha_completado: z
    .date()
    .nullable()
    .openapi({
      example: new Date("1990-01-01"),
      description: "Fecha de la finalización de la asignacion.",
    }),
}) satisfies z.ZodType<Prisma.asignacionesModel>;

// ----- Types -----
export type AsignacionRaw = z.infer<typeof AsignacionRawSchema>;
