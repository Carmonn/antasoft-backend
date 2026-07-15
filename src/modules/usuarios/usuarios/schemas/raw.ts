import { z } from "@hono/zod-openapi";
import { Prisma } from "@/generated/client.ts";

// ----- Database Schemas -----
export const UsuarioRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del usuario.",
  }),
  persona_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico de la persona.",
  }),
  rol_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del rol.",
  }),
  correo: z.email().openapi({
    example: "usuario@dominio.com",
    description: "Correo electronico del usuario.",
  }),
  contrasena: z.string().min(8).openapi({
    example: "contrasena123",
    description: "Contrasena del usuario.",
  }),
  fecha_acceso: z.date().nullable().openapi({
    example: "2023-01-01T00:00:00.000Z",
    description: "Fecha del ultimo acceso del usuario.",
  }),
  refresh_token: z.string().nullable().openapi({
    example: "token123",
    description: "Token de refresco del usuario.",
  }),
}) satisfies z.ZodType<Prisma.usuariosModel>;

export const UsuarioPermisoRawSchema = z.object({
  id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del usuario-permiso.",
  }),
  permiso_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del permiso.",
  }),
  usuario_id: z.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del usuario.",
  }),
}) satisfies z.ZodType<Prisma.usuarios_permisosModel>;

// ----- Types -----
export type UsuarioRaw = z.infer<typeof UsuarioRawSchema>;
export type UsuarioPermisoRaw = z.infer<typeof UsuarioPermisoRawSchema>;
