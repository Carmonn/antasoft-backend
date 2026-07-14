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

/** Actualiza un rol aplicando reglas de negocio */
export const updateRolService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateRolSchema>,
): Promise<RolDetail> => {
  const personaRaw = await findRolBasicRawById(prisma, id);
  if (!personaRaw) {
    throw rolesErrors.notFound;
  }

  const personaRawDuplicate = await findRolBasicRawByIdentity(prisma, {
    nombre: input.nombre,
  });
  if (personaRawDuplicate && personaRawDuplicate.id !== id) {
    throw rolesErrors.alreadyExists;
  }
  const { id: rol_id } = await updateRolAggregate(prisma, id, input);
  const rolUpdatedRaw = await findRolDetailRawById(prisma, rol_id);

  return toRolDetail(rolUpdatedRaw!);
};
