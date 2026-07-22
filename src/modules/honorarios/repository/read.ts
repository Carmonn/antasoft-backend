import { Prisma, PrismaClient } from "@/generated/client.ts";

import type {
  HonorarioBasicRaw,
  HonorarioDetailRaw,
} from "../schemas/repository.ts";

import { asignacionDetailInclude } from "@/modules/asignaciones/repository/read.ts";
import { personaDetailInclude } from "@/modules/personas/repository/read.ts";

// ----- Parametros consulta -----
// export const honorarioBasicInclude = {} as const;

export const honorarioDetailInclude = {
  asignacion: {
    include: asignacionDetailInclude,
  },
  persona: {
    include: personaDetailInclude,
  },
  estatus_honorario: true,
} as const;

// ----- Consultas -----
/** Busca un honorario básico, se le tiene que pasar los parametros de consulta */
export const findHonorarioBasicRaw = async (
  prisma: PrismaClient,
  options: Prisma.honorariosFindFirstArgs,
): Promise<HonorarioBasicRaw | null> => {
  return await prisma.honorarios.findFirst({
    ...options,
  });
};
/** Busca un honorario básico por su ID. */
export const findHonorarioBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.honorariosFindUniqueArgs,
): Promise<HonorarioBasicRaw | null> => {
  return await prisma.honorarios.findUnique({
    where: { id },
    ...options,
  });
};
/** Busca un honorario básico por su identidad unica en formato raw. */
export const findHonorarioBasicRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    asignacion_id: number | undefined;
  },
  options?: Prisma.honorariosFindFirstArgs,
): Promise<HonorarioBasicRaw | null> => {
  return await prisma.honorarios.findFirst({
    where: {
      asignacion_id: identity.asignacion_id,
    },
    ...options,
  });
};

/** Busca un honorario detallado, se le tiene que pasar los parametros de consulta */
export const findHonorarioDetailRaw = async (
  prisma: PrismaClient,
  options: Prisma.honorariosFindFirstArgs,
): Promise<HonorarioDetailRaw | null> => {
  return await prisma.honorarios.findFirst({
    ...options,
    include: honorarioDetailInclude,
  });
};
/** Busca un honorario detallado por su ID. */
export const findHonorarioDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.honorariosFindUniqueArgs,
): Promise<HonorarioDetailRaw | null> => {
  return await prisma.honorarios.findUnique({
    where: { id },
    ...options,
    include: honorarioDetailInclude,
  });
};
/** Busca un honorario detallado por identidad en formato raw. */
export const findHonorarioDetailRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    asignacion_id: number | undefined;
  },
  options?: Prisma.honorariosFindFirstArgs,
): Promise<HonorarioDetailRaw | null> => {
  return await prisma.honorarios.findFirst({
    where: {
      asignacion_id: identity.asignacion_id,
    },
    ...options,
    include: honorarioDetailInclude,
  });
};

/** Lista los honorarios básicos */
export const listHonorariosBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.honorariosFindManyArgs,
): Promise<HonorarioBasicRaw[]> => {
  return await prisma.honorarios.findMany({
    ...options,
  });
};
/** Lista los honorarios detallados */
export const listHonorariosDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.honorariosFindManyArgs,
): Promise<HonorarioDetailRaw[]> => {
  return await prisma.honorarios.findMany({
    ...options,
    include: honorarioDetailInclude,
  });
};
