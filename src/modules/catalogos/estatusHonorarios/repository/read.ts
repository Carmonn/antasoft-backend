import { Prisma, PrismaClient } from "@/generated/client.ts";
import { z } from "@hono/zod-openapi";

import { EstatusHonorarioBasicRawSchema } from "../schemas/repository.ts";

// ----- Types -----
export type EstatusHonorarioBasicRaw = z.infer<
  typeof EstatusHonorarioBasicRawSchema
>;

// ----- Parametros consulta -----
// export const estatusAsignacionDetailInclude = {} as const;

// ----- Consultas -----
/** Busca un estatus de honorario básico por su ID. */
export const findEstatusHonorarioBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.estatus_honorariosFindUniqueArgs,
): Promise<EstatusHonorarioBasicRaw | null> => {
  return await prisma.estatus_honorarios.findUnique({
    where: { id },
    ...options,
  });
};

/** Lista los estatus de honorario básicos */
export const listEstatusHonorariosBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.estatus_honorariosFindManyArgs,
): Promise<EstatusHonorarioBasicRaw[]> => {
  return await prisma.estatus_honorarios.findMany(options);
};
