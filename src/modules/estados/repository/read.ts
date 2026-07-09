import { PrismaClient } from "@/generated/client.ts";
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
): Promise<EstadoBasicRaw | null> => {
  return await prisma.estados.findUnique({
    where: { id },
  });
};

/** Busca un estado detallado por su ID. */
export const findEstadoDetailRawById = async (
  prisma: PrismaClient,
  id: number,
): Promise<EstadoDetailRaw | null> => {
  return await prisma.estados.findUnique({
    where: { id },
    include: estadoDetailInclude,
  });
};

/** Lista los estados básicos, opcionalmente filtrando por IDs de alcance. */
export const listEstadosBasicRaw = async (
  prisma: PrismaClient,
  opts?: { scopeIds?: number[] },
): Promise<EstadoBasicRaw[]> => {
  if (!opts?.scopeIds) {
    return await prisma.estados.findMany();
  }

  return await prisma.estados.findMany({
    where: {
      municipios: {
        some: {
          id: { in: opts.scopeIds },
        },
      },
    },
  });
};

/** Lista los estados detallados, opcionalmente filtrando por IDs de alcance. */
export const listEstadosDetailRaw = async (
  prisma: PrismaClient,
  opts?: { scopeIds?: number[] },
): Promise<EstadoDetailRaw[]> => {
  if (!opts?.scopeIds) {
    return await prisma.estados.findMany({
      include: estadoDetailInclude,
    });
  }

  return await prisma.estados.findMany({
    where: {
      municipios: {
        some: {
          id: { in: opts.scopeIds },
        },
      },
    },
    include: estadoDetailInclude,
  });
};
