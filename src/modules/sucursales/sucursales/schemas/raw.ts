import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const SucursalRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del cliente.",
  }),
  municipio_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del municipio.",
  }),
  cliente_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del cliente.",
  }),
  nombre: z.string().min(1).openapi({
    example: "BBVA",
    description: "Nombre de la sucursal.",
  }),
  direccion: z.string().nullable().openapi({
    example: "Av. Insurgentes Sur 1234, Col. Del Valle, CDMX",
    description: "Direccion de la sucursal.",
  }),
  clave_signature: z.string().min(1).openapi({
    example: "SIRH34OA2",
    description: "Claves de la sucursal unidas en una sola.",
  }),
}) satisfies z.ZodType<Prisma.sucursalesModel>;

export const ClaveRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la clave.",
  }),
  sucursal_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la sucursal.",
  }),
  identificador_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del identificador.",
  }),
  valor: z.string().min(1).openapi({
    example: "34OA2",
    description: "Valor de la clave.",
  }),
}) satisfies z.ZodType<Prisma.clavesModel>;

// ----- Types -----
export type SucursalRaw = z.infer<typeof SucursalRawSchema>;
export type ClaveRaw = z.infer<typeof ClaveRawSchema>;
