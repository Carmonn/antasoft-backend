import { PrismaClient } from "@/generated/client.ts";
import { z } from "@hono/zod-openapi";

import { MedioBasicRawSchema } from "../schemas/repository.ts";

// ----- Types -----
export type MedioBasicRaw = z.infer<typeof MedioBasicRawSchema>;

// ----- Parametros consulta -----
// export const medioDetailInclude = {} as const;

// ----- Consultas -----
/** Busca un medio básico por su ID. */
export const findMedioBasicRawById = async (
  prisma: PrismaClient,
  id: number,
): Promise<MedioBasicRaw | null> => {
  return await prisma.medios.findUnique({
    where: { id },
  });
};

/** Lista los medios básicos */
export const listMediosBasicRaw = async (
  prisma: PrismaClient,
): Promise<MedioBasicRaw[]> => {
  return await prisma.medios.findMany();
};
