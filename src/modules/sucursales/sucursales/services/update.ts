import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { generateClaveSignature } from "../repository/utils.ts";

import { UpdateSucursalSchema } from "../schemas/request.ts";
import type { SucursalDetail } from "../schemas/response.ts";

import {
  findSucursalBasicRawById,
  findSucursalDetailRawById,
  findSucursalBasicRawByIdentity,
} from "../repository/read.ts";
import { updateSucursalAggregate } from "../repository/write.ts";
import { toSucursalDetail } from "../repository/mapper.ts";

import { sucursalesErrors } from "../errors.ts";

/** Actualiza una sucursal aplicando reglas de negocio y scope. */
export const updateSucursalService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateSucursalSchema>,
): Promise<SucursalDetail> => {
  const sucursalRaw = await findSucursalBasicRawById(prisma, id);
  if (!sucursalRaw) {
    throw sucursalesErrors.notFound;
  }

  let clave_signature: string | undefined = undefined;
  if (input.claves !== undefined) {
    clave_signature = generateClaveSignature(input.claves);
  }
  const sucursalRawDuplicate = await findSucursalBasicRawByIdentity(prisma, {
    cliente_id: input.cliente_id ?? sucursalRaw.cliente_id,
    clave_signature: clave_signature ?? sucursalRaw.clave_signature,
  });
  if (sucursalRawDuplicate && sucursalRawDuplicate.id !== id) {
    throw sucursalesErrors.alreadyExists;
  }
  const { id: sucursal_id } = await updateSucursalAggregate(prisma, id, input);
  const sucursalUpdatedRaw = await findSucursalDetailRawById(
    prisma,
    sucursal_id,
  );

  return toSucursalDetail(sucursalUpdatedRaw!);
};
