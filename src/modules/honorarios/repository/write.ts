import { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import {
  CreateHonorarioSchema,
  UpdateHonorarioSchema,
} from "../schemas/request.ts";
import type { HonorarioRaw } from "../schemas/raw.ts";

// ----- Consultas -----
/** Crea un honorario y sus relaciones en una sola transaccion. */
export const createHonorarioAggregate = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateHonorarioSchema>,
): Promise<HonorarioRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { ...honorarioData } = input;
    const fecha_solicitud = new Date();
    const honorario = await tx.honorarios.create({
      data: { ...honorarioData, fecha_solicitud },
    });

    return honorario;
  });
};

/** Actualiza un honorario y sincroniza sus relaciones en una transaccion. */
export const updateHonorarioAggregate = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateHonorarioSchema>,
): Promise<HonorarioRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { ...honorarioData } = input;

    const honorario = await tx.honorarios.update({
      where: { id },
      data: honorarioData,
    });

    return honorario;
  });
};

/** Elimina un honorario y limpia relaciones asociadas en transaccion. */
export const deleteHonorarioAggregate = async (
  prisma: PrismaClient,
  id: number,
): Promise<HonorarioRaw> => {
  return await prisma.$transaction(async (tx) => {
    const honorario = await tx.honorarios.delete({ where: { id } });

    return honorario;
  });
};
