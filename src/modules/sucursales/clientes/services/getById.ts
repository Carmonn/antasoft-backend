import { PrismaClient } from "@/generated/client.ts";

import { findClienteDetailRawById } from "../repository/read.ts";
import { toClienteDetail } from "../repository/mapper.ts";

import { clientesErrors } from "../errors.ts";

/** Obtiene un cliente por id y lo transforma al formato publico de respuesta. */
export const getClienteByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const clienteRaw = await findClienteDetailRawById(prisma, id);

  if (!clienteRaw) {
    throw clientesErrors.notFound;
  }

  return toClienteDetail(clienteRaw);
};
