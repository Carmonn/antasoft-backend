import { Prisma, PrismaClient } from "@/generated/client.ts";
import { z } from "@hono/zod-openapi";

import {
  MunicipioBasicRawSchema,
  MunicipioDetailRawSchema,
} from "../schemas/repository.ts";

// ----- Types -----
export type MunicipioBasicRaw = z.infer<typeof MunicipioBasicRawSchema>;
export type MunicipioDetailRaw = z.infer<typeof MunicipioDetailRawSchema>;

// ----- Parametros consulta -----
export const municipioDetailInclude = {
  estado: true,
} as const;

// ----- Consultas -----
/** Busca un municipio básico por su ID. */
export const findMunicipioBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.municipiosFindUniqueArgs,
): Promise<MunicipioBasicRaw | null> => {
  return await prisma.municipios.findUnique({
    where: { id },
    ...options,
  });
};

/** Busca un municipio detallado por su ID. */
export const findMunicipioDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.municipiosFindUniqueArgs,
): Promise<MunicipioDetailRaw | null> => {
  return await prisma.municipios.findUnique({
    where: { id },
    ...options,
    include: municipioDetailInclude,
  });
};

/** Lista los municipios básicos */
export const listMunicipiosBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.municipiosFindManyArgs,
): Promise<MunicipioBasicRaw[]> => {
  return await prisma.municipios.findMany(options);
};

/** Lista los municipios detallados */
export const listMunicipiosDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.municipiosFindManyArgs,
): Promise<MunicipioDetailRaw[]> => {
  return await prisma.municipios.findMany({
    ...options,
    include: municipioDetailInclude,
  });
};
