import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { UpdateUsuarioSchema } from "../schemas/request.ts";
import type { UsuarioDetail } from "../schemas/response.ts";

import {
  findUsuarioBasicRawById,
  findUsuarioDetailRawById,
  findUsuarioBasicRawByIdentity,
} from "../repository/read.ts";
import { updateUsuarioAggregate } from "../repository/write.ts";
import { toUsuarioDetail } from "../repository/mapper.ts";

import { usuariosErrors } from "../errors.ts";

/** Actualiza un usuario aplicando reglas de negocio. */
export const updateUsuarioService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateUsuarioSchema>,
): Promise<UsuarioDetail> => {
  const usuarioRaw = await findUsuarioBasicRawById(prisma, id);
  if (!usuarioRaw) {
    throw usuariosErrors.notFound;
  }

  const usuarioRawDuplicate = await findUsuarioBasicRawByIdentity(prisma, {
    correo: input.correo,
  });
  if (usuarioRawDuplicate && usuarioRawDuplicate.id !== id) {
    throw usuariosErrors.alreadyExists;
  }
  const { id: usuario_id } = await updateUsuarioAggregate(prisma, id, input);
  const usuarioUpdatedRaw = await findUsuarioDetailRawById(prisma, usuario_id);

  return toUsuarioDetail(usuarioUpdatedRaw!);
};
