import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const ClienteRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del cliente.",
  }),
  nombre: z.string().min(1).openapi({
    example: "BBVA",
    description: "Nombre del cliente.",
  }),
}) satisfies z.ZodType<Prisma.clientesModel>;

export const IdentificadorRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del usuario-permiso.",
  }),
  cliente_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del cliente.",
  }),
  nombre: z.string().min(1).openapi({
    example: "SIRH",
    description: "Nombre del identificador.",
  }),
}) satisfies z.ZodType<Prisma.identificadoresModel>;

// ----- Types -----
export type ClienteRaw = z.infer<typeof ClienteRawSchema>;
export type IdentificadorRaw = z.infer<typeof IdentificadorRawSchema>;
