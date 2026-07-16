import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { UpdateClienteSchema } from "../schemas/request.ts";
import type { ClienteDetail } from "../schemas/response.ts";

import {
  findClienteBasicRawById,
  findClienteDetailRawById,
  findClienteBasicRawByIdentity,
} from "../repository/read.ts";
import { updateClienteAggregate } from "../repository/write.ts";
import { toClienteDetail } from "../repository/mapper.ts";

import { clientesErrors } from "../errors.ts";

/** Actualiza un cliente aplicando reglas de negocio y scope. */
export const updateClienteService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateClienteSchema>,
): Promise<ClienteDetail> => {
  const clienteRaw = await findClienteBasicRawById(prisma, id);
  if (!clienteRaw) {
    throw clientesErrors.notFound;
  }

  const clienteRawDuplicate = await findClienteBasicRawByIdentity(prisma, {
    nombre: input.nombre,
  });
  if (clienteRawDuplicate && clienteRawDuplicate.id !== id) {
    throw clientesErrors.alreadyExists;
  }
  const { id: cliente_id } = await updateClienteAggregate(prisma, id, input);
  const clienteUpdatedRaw = await findClienteDetailRawById(prisma, cliente_id);

  return toClienteDetail(clienteUpdatedRaw!);
};
