import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const PersonaRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del estado.",
  }),
  alias: z.string().trim().min(1).openapi({
    example: "Juanito",
    description: "Alias de la persona.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "Juan",
    description: "Nombre de la persona.",
  }),
  apellido_paterno: z.string().trim().min(1).nullable().openapi({
    example: "Pérez",
    description: "Apellido paterno de la persona.",
  }),
  apellido_materno: z.string().trim().min(1).nullable().openapi({
    example: "García",
    description: "Apellido materno de la persona.",
  }),
  fecha_nacimiento: z
    .date()
    .nullable()
    .openapi({
      example: new Date("1990-01-01"),
      description: "Fecha de nacimiento de la persona.",
    }),
}) satisfies z.ZodType<Prisma.personasModel>;

export const ContactoRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del contacto.",
  }),
  medio_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del medio de contacto.",
  }),
  persona_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la persona.",
  }),
  valor: z.string().trim().min(1).openapi({
    example: "5555555555",
    description: "Valor del contacto.",
  }),
}) satisfies z.ZodType<Prisma.contactosModel>;

export const PersonaMunicipioRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la relacion persona-municipio.",
  }),
  persona_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la persona.",
  }),
  municipio_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del municipio.",
  }),
}) satisfies z.ZodType<Prisma.personas_municipiosModel>;

// ----- Types -----
export type PersonaRaw = z.infer<typeof PersonaRawSchema>;
export type ContactoRaw = z.infer<typeof ContactoRawSchema>;
export type PersonaMunicipioRaw = z.infer<typeof PersonaMunicipioRawSchema>;
