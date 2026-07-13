import { PrismaClient } from "@/generated/client.ts";
import { z } from "@hono/zod-openapi";

import { PermisoBasicRawSchema } from "../schemas/repository.ts";

// ----- Types -----
export type PermidoBasicRaw = z.infer<typeof PermisoBasicRawSchema>;

// ----- Parametros consulta -----
// export const permisoDetailInclude = {} as const;

// ----- Consultas -----
/** Busca un estado básico por su ID. */
export const findPermisoBasicRawById = async (
  prisma: PrismaClient,
  id: number,
): Promise<PermidoBasicRaw | null> => {
  return await prisma.permisos.findUnique({
    where: { id },
  });
};

/** Lista los estados básicos, opcionalmente filtrando por IDs de alcance. */
export const listPermisosBasicRaw = async (
  prisma: PrismaClient,
): Promise<PermidoBasicRaw[]> => {
  return await prisma.permisos.findMany();
};
