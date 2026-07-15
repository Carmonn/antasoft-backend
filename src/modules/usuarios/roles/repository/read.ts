import { Prisma, PrismaClient } from "@/generated/client.ts";

import type { RolBasicRaw, RolDetailRaw } from "../schemas/repository.ts";

// ----- Parametros consulta -----
export const rolDetailInclude = {
  permisos: {
    include: {
      permiso: true,
    },
  },
} as const;

// ----- Consultas -----
/** Busca un rol básico, se le tiene que pasar los parametros de consulta */
export const findRolBasicRaw = async (
  prisma: PrismaClient,
  options: Prisma.rolesFindFirstArgs,
): Promise<RolBasicRaw | null> => {
  return await prisma.roles.findFirst({
    ...options,
  });
};
/** Busca un rol básica por su ID. */
export const findRolBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.rolesFindUniqueArgs,
): Promise<RolBasicRaw | null> => {
  return await prisma.roles.findUnique({
    where: { id },
    ...options,
  });
};
/** Busca un rol basica por su identidad unica en formato raw. */
export const findRolBasicRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    nombre: string | undefined;
  },
  options?: Prisma.rolesFindFirstArgs,
): Promise<RolBasicRaw | null> => {
  return await prisma.roles.findFirst({
    where: {
      nombre: identity.nombre,
    },
    ...options,
  });
};

/** Busca un rol detallado, se le tiene que pasar los parametros de consulta */
export const findRolDetailRaw = async (
  prisma: PrismaClient,
  options: Prisma.rolesFindFirstArgs,
): Promise<RolDetailRaw | null> => {
  return await prisma.roles.findFirst({
    ...options,
    include: rolDetailInclude,
  });
};
/** Busca un rol detallado por su ID. */
export const findRolDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.rolesFindUniqueArgs,
): Promise<RolDetailRaw | null> => {
  return await prisma.roles.findUnique({
    where: { id },
    ...options,
    include: rolDetailInclude,
  });
};
/** Busca un rol detallo por su identidad en formato raw. */
export const findRolDetailRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    nombre: string | undefined;
  },
  options?: Prisma.rolesFindFirstArgs,
): Promise<RolDetailRaw | null> => {
  return await prisma.roles.findFirst({
    where: {
      nombre: identity.nombre,
    },
    ...options,
    include: rolDetailInclude,
  });
};

/** Lista los roles básicos */
export const listRolesBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.rolesFindManyArgs,
): Promise<RolBasicRaw[]> => {
  return await prisma.roles.findMany(options);
};
/** Lista los roles detallados */
export const listRolesDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.rolesFindManyArgs,
): Promise<RolDetailRaw[]> => {
  return await prisma.roles.findMany({
    ...options,
    include: rolDetailInclude,
  });
};
