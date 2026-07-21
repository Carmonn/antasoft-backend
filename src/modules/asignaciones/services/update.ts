import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { UpdateAsignacionSchema } from "../schemas/request.ts";
import type { AsignacionDetail } from "../schemas/response.ts";

import {
  findAsignacionBasicRawById,
  findAsignacionDetailRawById,
  findAsignacionBasicRawByIdentity,
} from "../repository/read.ts";
import { updateAsignacionAggregate } from "../repository/write.ts";
import { toAsignacionDetail } from "../repository/mapper.ts";

import { asignacionesErrors } from "../errors.ts";

/** Actualiza una asignación aplicando reglas de negocio y scope. */
export const updateAsignacionService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateAsignacionSchema>,
): Promise<AsignacionDetail> => {
  const asignacionRaw = await findAsignacionBasicRawById(prisma, id);
  if (!asignacionRaw) {
    throw asignacionesErrors.notFound;
  }

  const asignacionRawDuplicate = await findAsignacionBasicRawByIdentity(
    prisma,
    {
      sucursal_id: input.sucursal_id ?? asignacionRaw.sucursal_id,
      trabajo_id: input.trabajo_id ?? asignacionRaw.trabajo_id,
    },
  );
  if (asignacionRawDuplicate && asignacionRawDuplicate.id !== id) {
    throw asignacionesErrors.alreadyExists;
  }
  const { id: asignacion_id } = await updateAsignacionAggregate(
    prisma,
    id,
    input,
  );
  const asignacionUpdatedRaw = await findAsignacionDetailRawById(
    prisma,
    asignacion_id,
  );

  return toAsignacionDetail(asignacionUpdatedRaw!);
};
