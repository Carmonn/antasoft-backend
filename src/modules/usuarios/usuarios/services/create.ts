import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreateUsuarioSchema } from "../schemas/request.ts";
import type { UsuarioDetail } from "../schemas/response.ts";

import {
  findUsuarioBasicRaw,
  findUsuarioDetailRawById,
} from "../repository/read.ts";
import { createUsuarioAggregate } from "../repository/write.ts";
import { toUsuarioDetail } from "../repository/mapper.ts";
import { usuariosErrors } from "../errors.ts";

import { listRolesBasicRaw } from "@/modules/usuarios/roles/repository/read.ts";

/** Crea un usuario */
export const createUsuarioService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateUsuarioSchema>,
): Promise<UsuarioDetail> => {
  const usuarioRaw = await findUsuarioBasicRaw(prisma, {
    where: {
      OR: [{ correo: input.correo }, { persona_id: input.persona_id }],
    },
  });
  if (usuarioRaw) {
    throw usuariosErrors.alreadyExists;
  }

  const rolesNoAsignables = await listRolesBasicRaw(prisma, {
    where: { asignable: false },
  });
  const isRolNoAsignable = rolesNoAsignables.some((rol) => {
    return input.rol_id === rol.id;
  });
  if (isRolNoAsignable) {
    throw usuariosErrors.notFoundRoles;
  }

  const { id: usuario_id } = await createUsuarioAggregate(prisma, input);
  const usuarioCreatedRaw = await findUsuarioDetailRawById(prisma, usuario_id);

  return toUsuarioDetail(usuarioCreatedRaw!);
};
