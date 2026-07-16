import { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import {
  CreateClienteSchema,
  UpdateClienteSchema,
} from "../schemas/request.ts";
import type { ClienteRaw } from "../schemas/raw.ts";

// ----- Consultas -----
/** Crea un cliente y sus relaciones de identificadores en una sola transaccion. */
export const createClienteAggregate = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateClienteSchema>,
): Promise<ClienteRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { identificadores, ...clienteData } = input;
    const cliente = await tx.clientes.create({ data: clienteData });

    await tx.identificadores.createMany({
      data: identificadores.map((nombre) => ({
        cliente_id: cliente.id,
        nombre,
      })),
    });

    return cliente;
  });
};

/** Actualiza un cliente y sincroniza relaciones de identificadores en transaccion. */
export const updateClienteAggregate = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateClienteSchema>,
): Promise<ClienteRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { identificadores, ...clienteData } = input;

    const cliente = await tx.clientes.update({
      where: { id },
      data: clienteData,
    });

    if (identificadores !== undefined) {
      await tx.identificadores.deleteMany({ where: { cliente_id: id } });
      await tx.identificadores.createMany({
        data: identificadores.map((nombre) => ({
          cliente_id: id,
          nombre,
        })),
      });
    }

    return cliente;
  });
};

/** Elimina un cliente y limpia relaciones asociadas en transaccion. */
export const deleteClienteAggregate = async (
  prisma: PrismaClient,
  id: number,
): Promise<ClienteRaw> => {
  return await prisma.$transaction(async (tx) => {
    const cliente = await tx.clientes.delete({ where: { id } });

    await tx.identificadores.deleteMany({ where: { cliente_id: id } });

    return cliente;
  });
};
