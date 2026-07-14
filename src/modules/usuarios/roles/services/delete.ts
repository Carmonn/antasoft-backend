import { PrismaClient } from "@/generated/client.ts";

import type { RolDetail } from "../schemas/response.ts";

import { findRolDetailRawById } from "../repository/read.ts";
import { deleteRolAggregate } from "../repository/write.ts";
import { toRolDetail } from "../repository/mapper.ts";

import { rolesErrors } from "../errors.ts";

/** Elimina un rol */
export const deleteRolService = async (
  prisma: PrismaClient,
  id: number,
): Promise<RolDetail> => {
  const rolRaw = await findRolDetailRawById(prisma, id);

  if (!rolRaw) {
    throw rolesErrors.notFound;
  }
  await deleteRolAggregate(prisma, id);

  return toRolDetail(rolRaw);
};
