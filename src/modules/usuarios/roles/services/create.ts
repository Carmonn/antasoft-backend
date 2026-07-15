import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreateRolSchema } from "../schemas/request.ts";
import type { RolDetail } from "../schemas/response.ts";
import {
  findRolDetailRawById,
  findRolBasicRawByIdentity,
} from "../repository/read.ts";
import { createRolAggregate } from "../repository/write.ts";
import { toRolDetail } from "../repository/mapper.ts";
import { rolesErrors } from "../errors.ts";

import { listPermisosBasicRaw } from "@/modules/catalogos/permisos/repository/read.ts";
import { permisosErrors } from "@/modules/catalogos/permisos/errors.ts";

/** Crea un rol */
export const createRolService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateRolSchema>,
): Promise<RolDetail> => {
  const rolRaw = await findRolBasicRawByIdentity(prisma, {
    nombre: input.nombre,
  });
  if (rolRaw) {
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

  const { id: rol_id } = await createRolAggregate(prisma, input);
  const rolCreatedRaw = await findRolDetailRawById(prisma, rol_id);

  return toRolDetail(rolCreatedRaw!);
};
