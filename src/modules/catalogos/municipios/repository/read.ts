import { PrismaClient } from "@/generated/client.ts";
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
): Promise<MunicipioBasicRaw | null> => {
  return await prisma.municipios.findUnique({
    where: { id },
  });
};

/** Busca un municipio detallado por su ID. */
export const findMunicipioDetailRawById = async (
  prisma: PrismaClient,
  id: number,
): Promise<MunicipioDetailRaw | null> => {
  return await prisma.municipios.findUnique({
    where: { id },
    include: municipioDetailInclude,
  });
};

/** Lista los municipios básicos */
export const listMunicipiosBasicRaw = async (
  prisma: PrismaClient,
): Promise<MunicipioBasicRaw[]> => {
  return await prisma.municipios.findMany();
};

/** Lista los municipios detallados */
export const listMunicipiosDetailRaw = async (
  prisma: PrismaClient,
): Promise<MunicipioDetailRaw[]> => {
  return await prisma.municipios.findMany({
    include: municipioDetailInclude,
  });
};
