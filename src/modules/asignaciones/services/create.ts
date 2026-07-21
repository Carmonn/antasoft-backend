import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreateAsignacionSchema } from "../schemas/request.ts";
import type { AsignacionDetail } from "../schemas/response.ts";

import {
  findAsignacionDetailRawById,
  findAsignacionBasicRawByIdentity,
} from "../repository/read.ts";
import { createAsignacionAggregate } from "../repository/write.ts";
import { toAsignacionDetail } from "../repository/mapper.ts";

import { asignacionesErrors } from "../errors.ts";

/** Crea una asignación */
export const createAsignacionService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateAsignacionSchema>,
): Promise<AsignacionDetail> => {
  const asignacionRaw = await findAsignacionBasicRawByIdentity(prisma, {
    sucursal_id: input.sucursal_id,
    trabajo_id: input.trabajo_id,
  });
  if (asignacionRaw) {
    throw asignacionesErrors.alreadyExists;
  }

  const { id: asignacion_id } = await createAsignacionAggregate(prisma, input);
  const asignacionCreatedRaw = await findAsignacionDetailRawById(
    prisma,
    asignacion_id,
  );

  return toAsignacionDetail(asignacionCreatedRaw!);
};
