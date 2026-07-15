import { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import {
  CreateUsuarioSchema,
  UpdateUsuarioSchema,
} from "../schemas/request.ts";
import type { UsuarioRaw } from "../schemas/raw.ts";

// ----- Consultas -----
/** Crea un usuario y sus relaciones en una sola transaccion. */
export const createUsuarioAggregate = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateUsuarioSchema>,
): Promise<UsuarioRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { permisos: permisosId, ...usuarioData } = input;
    const usuario = await tx.usuarios.create({
      data: { ...usuarioData, fecha_acceso: null },
    });

    await tx.usuarios_permisos.createMany({
      data: permisosId.map((permisoId) => ({
        usuario_id: usuario.id,
        permiso_id: permisoId,
      })),
    });

    return usuario;
  });
};

/** Actualiza un usuario y sincroniza sus relaciones en una sola transaccion. */
export const updateUsuarioAggregate = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateUsuarioSchema>,
): Promise<UsuarioRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { permisos: permisosId, ...usuarioData } = input;

    const usuario = await tx.usuarios.update({
      where: { id },
      data: { ...usuarioData },
    });

    if (permisosId !== undefined) {
      await tx.usuarios_permisos.deleteMany({ where: { usuario_id: id } });
      await tx.usuarios_permisos.createMany({
        data: permisosId.map((permisoId) => ({
          usuario_id: usuario.id,
          permiso_id: permisoId,
        })),
      });
    }

    return usuario;
  });
};

/** Elimina un usuario y limpia relaciones asociadas en transaccion. */
export const deleteUsuarioAggregate = async (
  prisma: PrismaClient,
  id: number,
): Promise<UsuarioRaw> => {
  return await prisma.$transaction(async (tx) => {
    const usuario = await tx.usuarios.delete({ where: { id } });

    await tx.usuarios_permisos.deleteMany({ where: { usuario_id: id } });

    return usuario;
  });
};
