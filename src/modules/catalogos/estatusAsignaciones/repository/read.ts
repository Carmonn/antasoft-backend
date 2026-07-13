import { PrismaClient } from "@/generated/client.ts";
import { z } from "@hono/zod-openapi";

import { EstatusAsignacionBasicRawSchema } from "../schemas/repository.ts";

// ----- Types -----
export type EstatusAsignacionBasicRaw = z.infer<
  typeof EstatusAsignacionBasicRawSchema
>;

// ----- Parametros consulta -----
// export const estatusAsignacionDetailInclude = {} as const;

// ----- Consultas -----
/** Busca un estatus de asignación básico por su ID. */
export const findEstatusAsignacionBasicRawById = async (
  prisma: PrismaClient,
  id: number,
): Promise<EstatusAsignacionBasicRaw | null> => {
  return await prisma.estatus_asignaciones.findUnique({
    where: { id },
  });
};

/** Lista los estatus de asignación básicos */
export const listEstatusAsignacionesBasicRaw = async (
  prisma: PrismaClient,
): Promise<EstatusAsignacionBasicRaw[]> => {
  return await prisma.estatus_asignaciones.findMany();
};
