import { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { generateClaveSignature } from "../repository/utils.ts";
import {
  CreateSucursalSchema,
  UpdateSucursalSchema,
} from "../schemas/request.ts";
import type { SucursalRaw } from "../schemas/raw.ts";

// ----- Consultas -----
/** Crea una sucursal y sus relaciones en una sola transaccion. */
export const createSucursalAggregate = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateSucursalSchema>,
): Promise<SucursalRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { claves, ...sucursalData } = input;
    const clave_signature = generateClaveSignature(claves);
    const sucursal = await tx.sucursales.create({
      data: { ...sucursalData, clave_signature },
    });

    await tx.claves.createMany({
      data: claves.map((item) => ({
        sucursal_id: sucursal.id,
        ...item,
      })),
    });

    return sucursal;
  });
};

/** Actualiza una sucursal y sincroniza sus relaciones en una transaccion. */
export const updateSucursalAggregate = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateSucursalSchema>,
): Promise<SucursalRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { claves, ...sucursalData } = input;

    const sucursal = await tx.sucursales.update({
      where: { id },
      data: sucursalData,
    });

    if (claves !== undefined) {
      await tx.claves.deleteMany({ where: { sucursal_id: id } });
      await tx.claves.createMany({
        data: claves.map((item) => ({
          sucursal_id: id,
          ...item,
        })),
      });
    }

    return sucursal;
  });
};

/** Elimina una sucursal y limpia relaciones asociadas en transaccion. */
export const deleteSucursalAggregate = async (
  prisma: PrismaClient,
  id: number,
): Promise<SucursalRaw> => {
  return await prisma.$transaction(async (tx) => {
    const sucursal = await tx.sucursales.delete({ where: { id } });

    await tx.claves.deleteMany({ where: { sucursal_id: id } });

    return sucursal;
  });
};
