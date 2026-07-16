import { PrismaClient } from "@/generated/client.ts";

import type { ClienteDetail } from "../schemas/response.ts";

import { findClienteDetailRawById } from "../repository/read.ts";
import { deleteClienteAggregate } from "../repository/write.ts";
import { toClienteDetail } from "../repository/mapper.ts";

import { clientesErrors } from "../errors.ts";

/** Elimina un cliente */
export const deleteClienteService = async (
  prisma: PrismaClient,
  id: number,
): Promise<ClienteDetail> => {
  const clienteRaw = await findClienteDetailRawById(prisma, id);

  if (!clienteRaw) {
    throw clientesErrors.notFound;
  }
  await deleteClienteAggregate(prisma, id);

  return toClienteDetail(clienteRaw);
};
