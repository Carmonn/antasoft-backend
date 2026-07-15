import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreateUsuarioSchema } from "../schemas/request.ts";
import type { UsuarioDetail } from "../schemas/response.ts";

import {
  findUsuarioDetailRawById,
  findUsuarioBasicRawByIdentity,
} from "../repository/read.ts";
import { createUsuarioAggregate } from "../repository/write.ts";
import { toUsuarioDetail } from "../repository/mapper.ts";

import { usuariosErrors } from "../errors.ts";

/** Crea un usuario */
export const createUsuarioService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateUsuarioSchema>,
): Promise<UsuarioDetail> => {
  const usuarioRaw = await findUsuarioBasicRawByIdentity(prisma, {
    correo: input.correo,
  });
  if (usuarioRaw) {
    throw usuariosErrors.alreadyExists;
  }

  const { id: usuario_id } = await createUsuarioAggregate(prisma, input);
  const usuarioCreatedRaw = await findUsuarioDetailRawById(prisma, usuario_id);

  return toUsuarioDetail(usuarioCreatedRaw!);
};
