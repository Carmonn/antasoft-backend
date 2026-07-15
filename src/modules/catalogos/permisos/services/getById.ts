import { PrismaClient } from "@/generated/client.ts";

import { findPermisoBasicRawById } from "../repository/read.ts";
import { toPermisoBasic } from "../repository/mapper.ts";

import { permisosErrors } from "../errors.ts";

/** Obtiene un permiso por id y lo transforma al formato publico de respuesta. */
export const getPermisoByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const permisoRaw = await findPermisoBasicRawById(prisma, id);

  if (!permisoRaw || permisoRaw.asignable === false) {
    throw permisosErrors.notFound;
  }

  return toPermisoBasic(permisoRaw);
};
