import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreateClienteSchema } from "../schemas/request.ts";
import type { ClienteDetail } from "../schemas/response.ts";

import {
  findClienteDetailRawById,
  findClienteBasicRawByIdentity,
} from "../repository/read.ts";
import { createClienteAggregate } from "../repository/write.ts";
import { toClienteDetail } from "../repository/mapper.ts";

import { clientesErrors } from "../errors.ts";

/** Crea un cliente */
export const createClienteService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateClienteSchema>,
): Promise<ClienteDetail> => {
  const clienteRaw = await findClienteBasicRawByIdentity(prisma, {
    nombre: input.nombre,
  });
  if (clienteRaw) {
    throw clientesErrors.alreadyExists;
  }

  const { id: cliente_id } = await createClienteAggregate(prisma, input);
  const clienteCreatedRaw = await findClienteDetailRawById(prisma, cliente_id);

  return toClienteDetail(clienteCreatedRaw!);
};
