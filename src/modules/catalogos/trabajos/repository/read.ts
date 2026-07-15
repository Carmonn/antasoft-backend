import { Prisma, PrismaClient } from "@/generated/client.ts";
import { z } from "@hono/zod-openapi";

import { TrabajoBasicRawSchema } from "../schemas/repository.ts";

// ----- Types -----
export type TrabajoBasicRaw = z.infer<typeof TrabajoBasicRawSchema>;

// ----- Parametros consulta -----
// export const trabajoDetailInclude = {} as const;

// ----- Consultas -----
/** Busca un trabajo básico por su ID. */
export const findTrabajoBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.trabajosFindUniqueArgs,
): Promise<TrabajoBasicRaw | null> => {
  return await prisma.trabajos.findUnique({
    where: { id },
    ...options,
  });
};

/** Lista los trabajos básicos */
export const listTrabajosBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.trabajosFindManyArgs,
): Promise<TrabajoBasicRaw[]> => {
  return await prisma.trabajos.findMany(options);
};
