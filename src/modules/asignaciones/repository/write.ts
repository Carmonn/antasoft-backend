import { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import {
  CreateAsignacionSchema,
  UpdateAsignacionSchema,
} from "../schemas/request.ts";
import type { AsignacionRaw } from "../schemas/raw.ts";

// ----- Consultas -----
/** Crea una sucursal y sus relaciones en una sola transaccion. */
export const createAsignacionAggregate = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateAsignacionSchema>,
): Promise<AsignacionRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { ...asignacionData } = input;
    const fecha_asignacion = new Date();
    const asignacion = await tx.asignaciones.create({
      data: { ...asignacionData, fecha_asignacion },
    });

    return asignacion;
  });
};

/** Actualiza una asignación y sincroniza sus relaciones en una transaccion. */
export const updateAsignacionAggregate = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateAsignacionSchema>,
): Promise<AsignacionRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { ...asignacionData } = input;

    const asignacion = await tx.asignaciones.update({
      where: { id },
      data: asignacionData,
    });

    return asignacion;
  });
};

/** Elimina una asignación y limpia relaciones asociadas en transaccion. */
export const deleteAsignacionAggregate = async (
  prisma: PrismaClient,
  id: number,
): Promise<AsignacionRaw> => {
  return await prisma.$transaction(async (tx) => {
    const asignacion = await tx.asignaciones.delete({ where: { id } });

    return asignacion;
  });
};
