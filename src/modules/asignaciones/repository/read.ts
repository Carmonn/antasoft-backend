import { Prisma, PrismaClient } from "@/generated/client.ts";

import type {
  AsignacionBasicRaw,
  AsignacionDetailRaw,
} from "../schemas/repository.ts";

import { sucursalDetailInclude } from "@/modules/sucursales/sucursales/repository/read.ts";
import { usuarioDetailInclude } from "@/modules/usuarios/usuarios/repository/read.ts";

// ----- Parametros consulta -----
// export const asignacionBasicInclude = {} as const;

export const asignacionDetailInclude = {
  sucursal: {
    include: sucursalDetailInclude,
  },
  usuario_responsable: {
    include: usuarioDetailInclude,
  },
  usuario_asignado: {
    include: usuarioDetailInclude,
  },
  trabajo: true,
  estatus_asignacion: true,
} as const;

// ----- Consultas -----
/** Busca una asignación básica, se le tiene que pasar los parametros de consulta */
export const findAsignacionBasicRaw = async (
  prisma: PrismaClient,
  options: Prisma.asignacionesFindFirstArgs,
): Promise<AsignacionBasicRaw | null> => {
  return await prisma.asignaciones.findFirst({
    ...options,
  });
};
/** Busca una sucursal básica por su ID. */
export const findAsignacionBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.asignacionesFindUniqueArgs,
): Promise<AsignacionBasicRaw | null> => {
  return await prisma.asignaciones.findUnique({
    where: { id },
    ...options,
  });
};
/** Busca una asignación básica por su identidad unica en formato raw. */
export const findAsignacionBasicRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    sucursal_id: number | undefined;
    trabajo_id: number | undefined;
  },
  options?: Prisma.asignacionesFindFirstArgs,
): Promise<AsignacionBasicRaw | null> => {
  return await prisma.asignaciones.findFirst({
    where: {
      sucursal_id: identity.sucursal_id,
      trabajo_id: identity.trabajo_id,
    },
    ...options,
  });
};

/** Busca una asignación detallada, se le tiene que pasar los parametros de consulta */
export const findAsignacionDetailRaw = async (
  prisma: PrismaClient,
  options: Prisma.asignacionesFindFirstArgs,
): Promise<AsignacionDetailRaw | null> => {
  return await prisma.asignaciones.findFirst({
    ...options,
    include: asignacionDetailInclude,
  });
};
/** Busca una asignación detallada por su ID. */
export const findAsignacionDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.asignacionesFindUniqueArgs,
): Promise<AsignacionDetailRaw | null> => {
  return await prisma.asignaciones.findUnique({
    where: { id },
    ...options,
    include: asignacionDetailInclude,
  });
};
/** Busca una asignación detallada por identidad en formato raw. */
export const findAsignacionDetailRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    sucursal_id: number | undefined;
    trabajo_id: number | undefined;
  },
  options?: Prisma.asignacionesFindFirstArgs,
): Promise<AsignacionDetailRaw | null> => {
  return await prisma.asignaciones.findFirst({
    where: {
      sucursal_id: identity.sucursal_id,
      trabajo_id: identity.trabajo_id,
    },
    ...options,
    include: asignacionDetailInclude,
  });
};

/** Lista las sucursales básicas */
export const listAsignacionesBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.asignacionesFindManyArgs,
): Promise<AsignacionBasicRaw[]> => {
  return await prisma.asignaciones.findMany({
    ...options,
  });
};
/** Lista las asignaciones detalladas */
export const listAsignacionesDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.asignacionesFindManyArgs,
): Promise<AsignacionDetailRaw[]> => {
  return await prisma.asignaciones.findMany({
    ...options,
    include: asignacionDetailInclude,
  });
};
