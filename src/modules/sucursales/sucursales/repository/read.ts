import { Prisma, PrismaClient } from "@/generated/client.ts";

import type {
  SucursalBasicRaw,
  SucursalDetailRaw,
} from "../schemas/repository.ts";

// ----- Parametros consulta -----
// export const clienteBasicInclude = {} as const;

export const sucursalDetailInclude = {
  municipio: {
    include: {
      estado: true,
    },
  },
  cliente: {
    include: {
      identificadores: true,
    },
  },
  claves: {
    include: {
      identificador: true,
    },
  },
} as const;

// ----- Consultas -----
/** Busca una sucursal básica, se le tiene que pasar los parametros de consulta */
export const findSucursalBasicRaw = async (
  prisma: PrismaClient,
  options: Prisma.sucursalesFindFirstArgs,
): Promise<SucursalBasicRaw | null> => {
  return await prisma.sucursales.findFirst({
    ...options,
  });
};
/** Busca una sucursal básica por su ID. */
export const findSucursalBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.sucursalesFindUniqueArgs,
): Promise<SucursalBasicRaw | null> => {
  return await prisma.sucursales.findUnique({
    where: { id },
    ...options,
  });
};
/** Busca una sucursal básica por su identidad unica en formato raw. */
export const findSucursalBasicRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    cliente_id: number | undefined;
    clave_signature: string | undefined;
  },
  options?: Prisma.sucursalesFindFirstArgs,
): Promise<SucursalBasicRaw | null> => {
  return await prisma.sucursales.findFirst({
    where: {
      cliente_id: identity.cliente_id,
      clave_signature: identity.clave_signature,
    },
    ...options,
  });
};

/** Busca una sucursal detallada, se le tiene que pasar los parametros de consulta */
export const findSucursalDetailRaw = async (
  prisma: PrismaClient,
  options: Prisma.sucursalesFindFirstArgs,
): Promise<SucursalDetailRaw | null> => {
  return await prisma.sucursales.findFirst({
    ...options,
    include: sucursalDetailInclude,
  });
};
/** Busca una sucursal detallada por su ID. */
export const findSucursalDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.sucursalesFindUniqueArgs,
): Promise<SucursalDetailRaw | null> => {
  return await prisma.sucursales.findUnique({
    where: { id },
    ...options,
    include: sucursalDetailInclude,
  });
};
/** Busca una sucursal detallada por identidad en formato raw. */
export const findSucursalDetailRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    cliente_id: number | undefined;
    clave_signature: string | undefined;
  },
  options?: Prisma.sucursalesFindFirstArgs,
): Promise<SucursalDetailRaw | null> => {
  return await prisma.sucursales.findFirst({
    where: {
      cliente_id: identity.cliente_id,
      clave_signature: identity.clave_signature,
    },
    ...options,
    include: sucursalDetailInclude,
  });
};

/** Lista las sucursales básicas */
export const listSucursalesBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.sucursalesFindManyArgs,
): Promise<SucursalBasicRaw[]> => {
  return await prisma.sucursales.findMany({
    ...options,
  });
};
/** Lista las sucursales detalladas */
export const listSucursalesDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.sucursalesFindManyArgs,
): Promise<SucursalDetailRaw[]> => {
  return await prisma.sucursales.findMany({
    ...options,
    include: sucursalDetailInclude,
  });
};
