import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { UpdateUsuarioSchema } from "../schemas/request.ts";
import type { UsuarioDetail } from "../schemas/response.ts";

import {
  findUsuarioBasicRaw,
  findUsuarioBasicRawById,
  findUsuarioDetailRawById,
} from "../repository/read.ts";
import { updateUsuarioAggregate } from "../repository/write.ts";
import { toUsuarioDetail } from "../repository/mapper.ts";
import { usuariosErrors } from "../errors.ts";

import { listRolesBasicRaw } from "@/modules/usuarios/roles/repository/read.ts";

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

  const usuarioRawDuplicateCorreo = await findUsuarioBasicRaw(prisma, {
    where: {
      correo: input.correo,
    },
  });
  const usuarioRawDuplicatePersona = await findUsuarioBasicRaw(prisma, {
    where: {
      persona_id: input.persona_id,
    },
  });
  if (
    (usuarioRawDuplicateCorreo && usuarioRawDuplicateCorreo.id !== id) ||
    (usuarioRawDuplicatePersona && usuarioRawDuplicatePersona.id !== id)
  ) {
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

  const { id: usuario_id } = await updateUsuarioAggregate(prisma, id, input);
  const usuarioUpdatedRaw = await findUsuarioDetailRawById(prisma, usuario_id);

  return toUsuarioDetail(usuarioUpdatedRaw!);
};
