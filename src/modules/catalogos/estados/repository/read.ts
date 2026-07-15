import { Prisma, PrismaClient } from "@/generated/client.ts";
import { z } from "@hono/zod-openapi";

import {
  EstadoBasicRawSchema,
  EstadoDetailRawSchema,
} from "../schemas/repository.ts";

// ----- Types -----
export type EstadoBasicRaw = z.infer<typeof EstadoBasicRawSchema>;
export type EstadoDetailRaw = z.infer<typeof EstadoDetailRawSchema>;

// ----- Parametros consulta -----
export const estadoDetailInclude = {
  municipios: true,
} as const;

// ----- Consultas -----
/** Busca un estado básico por su ID. */
export const findEstadoBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.estadosFindUniqueArgs,
): Promise<EstadoBasicRaw | null> => {
  return await prisma.estados.findUnique({
    where: { id },
    ...options,
  });
};

/** Busca un estado detallado por su ID. */
export const findEstadoDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.estadosFindUniqueArgs,
): Promise<EstadoDetailRaw | null> => {
  return await prisma.estados.findUnique({
    where: { id },
    ...options,
    include: estadoDetailInclude,
  });
};

/** Lista los estados básicos */
export const listEstadosBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.estadosFindManyArgs,
): Promise<EstadoBasicRaw[]> => {
  return await prisma.estados.findMany(options);
};

/** Lista los estados detallados */
export const listEstadosDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.estadosFindManyArgs,
): Promise<EstadoDetailRaw[]> => {
  return await prisma.estados.findMany({
    ...options,
    include: estadoDetailInclude,
  });
};
