import { PrismaClient } from "@/generated/client.ts";

import { findRolDetailRawById } from "../repository/read.ts";
import { toRolDetail } from "../repository/mapper.ts";

import { rolesErrors } from "../errors.ts";

/** Obtiene una rol por id y lo transforma al formato publico de respuesta. */
export const getRolByIdService = async (prisma: PrismaClient, id: number) => {
  const rolRaw = await findRolDetailRawById(prisma, id);

  if (!rolRaw) {
    throw rolesErrors.notFound;
  }

  return toRolDetail(rolRaw);
};
