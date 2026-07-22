import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { UpdateHonorarioSchema } from "../schemas/request.ts";
import type { HonorarioDetail } from "../schemas/response.ts";

import {
  findHonorarioBasicRawById,
  findHonorarioDetailRawById,
  findHonorarioBasicRawByIdentity,
} from "../repository/read.ts";
import { updateHonorarioAggregate } from "../repository/write.ts";
import { toHonorarioDetail } from "../repository/mapper.ts";

import { honorariosErrors } from "../errors.ts";

/** Actualiza un honorario aplicando reglas de negocio y scope. */
export const updateHonorarioService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdateHonorarioSchema>,
): Promise<HonorarioDetail> => {
  const honorarioRaw = await findHonorarioBasicRawById(prisma, id);
  if (!honorarioRaw) {
    throw honorariosErrors.notFound;
  }

  const honorarioRawDuplicate = await findHonorarioBasicRawByIdentity(prisma, {
    asignacion_id: input.asignacion_id ?? honorarioRaw.asignacion_id,
  });
  if (honorarioRawDuplicate && honorarioRawDuplicate.id !== id) {
    throw honorariosErrors.alreadyExists;
  }
  const { id: honorario_id } = await updateHonorarioAggregate(
    prisma,
    id,
    input,
  );
  const honorarioUpdatedRaw = await findHonorarioDetailRawById(
    prisma,
    honorario_id,
  );

  return toHonorarioDetail(honorarioUpdatedRaw!);
};
