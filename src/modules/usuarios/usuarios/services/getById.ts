import { PrismaClient } from "@/generated/client.ts";

import { findUsuarioDetailRawById } from "../repository/read.ts";
import { toUsuarioDetail } from "../repository/mapper.ts";

import { usuariosErrors } from "../errors.ts";

/** Obtiene un usuario por id y lo transforma al formato publico de respuesta. */
export const getUsuarioByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const usuarioRaw = await findUsuarioDetailRawById(prisma, id);

  if (!usuarioRaw) {
    throw usuariosErrors.notFound;
  }

  return toUsuarioDetail(usuarioRaw);
};
