import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { UpdateRolSchema } from "../schemas/request.ts";
import type { RolDetail } from "../schemas/response.ts";

import {
  findRolBasicRawById,
  findRolDetailRawById,
  findRolBasicRawByIdentity,
} from "../repository/read.ts";
import { updateRolAggregate } from "../repository/write.ts";
import { toRolDetail } from "../repository/mapper.ts";
import { rolesErrors } from "../errors.ts";

import { listPermisosBasicRaw } from "@/modules/catalogos/permisos/repository/read.ts";
import { permisosErrors } from "@/modules/catalogos/permisos/errors.ts";

/** Actualiza un rol aplicando reglas de negocio */
export const updateRolService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateRolSchema>,
): Promise<RolDetail> => {
  const rolRaw = await findRolBasicRawById(prisma, id);
  if (!rolRaw) {
    throw rolesErrors.notFound;
  }

  const rolRawDuplicate = await findRolBasicRawByIdentity(prisma, {
    nombre: input.nombre,
  });
  if (rolRawDuplicate && rolRawDuplicate.id !== id) {
    throw rolesErrors.alreadyExists;
  }

  const permisosNoAsignables = await listPermisosBasicRaw(prisma, {
    where: { asignable: true },
  });
  const isPermisosNoAsignables = permisosNoAsignables.some((permiso) => {
    return input.permisos?.includes(permiso.id);
  });
  if (isPermisosNoAsignables) {
    throw permisosErrors.notFound;
  }

  const { id: rol_id } = await updateRolAggregate(prisma, id, input);
  const rolUpdatedRaw = await findRolDetailRawById(prisma, rol_id);

  return toRolDetail(rolUpdatedRaw!);
};
