import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const PermisoRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del permiso.",
  }),
  nombre: z.string().trim().min(1).openapi({
    example: "Ver usuarios",
    description: "Nombre del permiso.",
  }),
  descripcion: z.string().trim().min(1).openapi({
    example: "Permite ver la información de los usuarios.",
    description: "Descripción del permiso.",
  }),
  identificador: z.string().trim().min(1).openapi({
    example: "usuario.ver",
    description: "Identificador unico del permiso.",
  }),
  asignable: z.boolean().openapi({
    example: true,
    description: "Indica si el permiso es asignable a un rol o usuario.",
  }),
}) satisfies z.ZodType<Prisma.permisosModel>;
