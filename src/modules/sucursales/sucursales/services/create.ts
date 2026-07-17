import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { generateClaveSignature } from "../repository/utils.ts";

import { CreateSucursalSchema } from "../schemas/request.ts";
import type { SucursalDetail } from "../schemas/response.ts";

import {
  findSucursalDetailRawById,
  findSucursalBasicRawByIdentity,
} from "../repository/read.ts";
import { createSucursalAggregate } from "../repository/write.ts";
import { toSucursalDetail } from "../repository/mapper.ts";

import { sucursalesErrors } from "../errors.ts";

/** Crea una sucursal */
export const createSucursalService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateSucursalSchema>,
): Promise<SucursalDetail> => {
  const clave_signature = generateClaveSignature(input.claves);
  const sucursalRaw = await findSucursalBasicRawByIdentity(prisma, {
    cliente_id: input.cliente_id,
    clave_signature: clave_signature,
  });
  if (sucursalRaw) {
    throw sucursalesErrors.alreadyExists;
  }

  const { id: sucursal_id } = await createSucursalAggregate(prisma, input);
  const sucursalCreatedRaw = await findSucursalDetailRawById(
    prisma,
    sucursal_id,
  );

  return toSucursalDetail(sucursalCreatedRaw!);
};
