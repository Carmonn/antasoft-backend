import { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreateRolSchema, UpdateRolSchema } from "../schemas/request.ts";
import type { RolRaw } from "../schemas/raw.ts";

// ----- Consultas -----
/** Crea un rol y sus relaciones de permisos en una sola transaccion. */
export const createRolAggregate = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateRolSchema>,
): Promise<RolRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { permisos: permisosId, ...rolData } = input;
    const rol = await tx.roles.create({
      data: { ...rolData, asignable: true },
    });

    await tx.roles_permisos.createMany({
      data: permisosId.map((permisoId) => ({
        rol_id: rol.id,
        permiso_id: permisoId,
      })),
    });

    return rol;
  });
};

/** Actualiza un rol y sincroniza relaciones de permisos en transaccion. */
export const updateRolAggregate = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateRolSchema>,
): Promise<RolRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { permisos: permisosId, ...rolData } = input;

    const rol = await tx.roles.update({
      where: { id },
      data: { ...rolData },
    });

    if (permisosId !== undefined) {
      await tx.roles_permisos.deleteMany({ where: { rol_id: id } });
      await tx.roles_permisos.createMany({
        data: permisosId.map((permisoId) => ({
          rol_id: rol.id,
          permiso_id: permisoId,
        })),
      });
    }

    return rol;
  });
};

/** Elimina un rol y limpia relaciones asociadas en transaccion. */
export const deleteRolAggregate = async (
  prisma: PrismaClient,
  id: number,
): Promise<RolRaw> => {
  return await prisma.$transaction(async (tx) => {
    const rol = await tx.roles.delete({ where: { id } });

    await tx.roles_permisos.deleteMany({ where: { rol_id: id } });

    return rol;
  });
};
