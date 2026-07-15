import { PrismaClient } from "@/generated/client.ts";

import type { UsuarioBasic } from "../schemas/response.ts";

import { findUsuarioBasicRawById } from "../repository/read.ts";
import { deleteUsuarioAggregate } from "../repository/write.ts";
import { toUsuarioBasic } from "../repository/mapper.ts";

import { usuariosErrors } from "../errors.ts";

/** Elimina un usuario */
export const deleteUsuarioService = async (
  prisma: PrismaClient,
  id: number,
): Promise<UsuarioBasic> => {
  const usuarioRaw = await findUsuarioBasicRawById(prisma, id);

  if (!usuarioRaw) {
    throw usuariosErrors.notFound;
  }
  await deleteUsuarioAggregate(prisma, id);

  return toUsuarioBasic(usuarioRaw);
};
