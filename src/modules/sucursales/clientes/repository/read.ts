import { Prisma, PrismaClient } from "@/generated/client.ts";

import type {
  ClienteBasicRaw,
  ClienteDetailRaw,
} from "../schemas/repository.ts";

// ----- Parametros consulta -----
// export const clienteBasicInclude = {} as const;

export const clienteDetailInclude = {
  identificadores: true,
} as const;

// ----- Consultas -----
/** Busca un cliente básico, se le tiene que pasar los parametros de consulta */
export const findClienteBasicRaw = async (
  prisma: PrismaClient,
  options: Prisma.clientesFindFirstArgs,
): Promise<ClienteBasicRaw | null> => {
  return await prisma.clientes.findFirst({
    ...options,
  });
};
/** Busca un cliente básico por su ID. */
export const findClienteBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.clientesFindUniqueArgs,
): Promise<ClienteBasicRaw | null> => {
  return await prisma.clientes.findUnique({
    where: { id },
    ...options,
  });
};
/** Busca un cliente basico por su identidad unica en formato raw. */
export const findClienteBasicRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    nombre: string | undefined;
  },
  options?: Prisma.clientesFindFirstArgs,
): Promise<ClienteBasicRaw | null> => {
  return await prisma.clientes.findFirst({
    where: {
      nombre: identity.nombre,
    },
    ...options,
  });
};

/** Busca un cliente detallado, se le tiene que pasar los parametros de consulta */
export const findClienteDetailRaw = async (
  prisma: PrismaClient,
  options: Prisma.clientesFindFirstArgs,
): Promise<ClienteDetailRaw | null> => {
  return await prisma.clientes.findFirst({
    ...options,
    include: clienteDetailInclude,
  });
};
/** Busca un cliente detallado por su ID. */
export const findClienteDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.clientesFindUniqueArgs,
): Promise<ClienteDetailRaw | null> => {
  return await prisma.clientes.findUnique({
    where: { id },
    ...options,
    include: clienteDetailInclude,
  });
};
/** Busca un cliente de detalle por identidad en formato raw. */
export const findClienteDetailRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    nombre: string | undefined;
  },
  options?: Prisma.clientesFindFirstArgs,
): Promise<ClienteDetailRaw | null> => {
  return await prisma.clientes.findFirst({
    where: {
      nombre: identity.nombre,
    },
    ...options,
    include: clienteDetailInclude,
  });
};

/** Lista los clientes básicas */
export const listClientesBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.clientesFindManyArgs,
): Promise<ClienteBasicRaw[]> => {
  return await prisma.clientes.findMany({
    ...options,
  });
};
/** Lista los clientes detallados */
export const listClientesDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.clientesFindManyArgs,
): Promise<ClienteDetailRaw[]> => {
  return await prisma.clientes.findMany({
    ...options,
    include: clienteDetailInclude,
  });
};
