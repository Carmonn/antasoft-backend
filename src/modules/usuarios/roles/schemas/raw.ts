import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const RolRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del rol.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "Administrador",
    description: "Nombre del rol.",
  }),
  asignable: z.boolean().openapi({
    example: true,
    description: "Indica si el rol es asignable y modificable a los usuarios.",
  }),
}) satisfies z.ZodType<Prisma.rolesModel>;

export const RolPermisoRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del rol-permiso.",
  }),
  permiso_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del permiso.",
  }),
  rol_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del rol.",
  }),
}) satisfies z.ZodType<Prisma.roles_permisosModel>;

// ----- Types -----
export type RolRaw = z.infer<typeof RolRawSchema>;
export type RolPermisoRaw = z.infer<typeof RolPermisoRawSchema>;
