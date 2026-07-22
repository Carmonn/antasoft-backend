import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreateHonorarioSchema } from "../schemas/request.ts";
import type { HonorarioDetail } from "../schemas/response.ts";

import {
  findHonorarioDetailRawById,
  findHonorarioBasicRawByIdentity,
} from "../repository/read.ts";
import { createHonorarioAggregate } from "../repository/write.ts";
import { toHonorarioDetail } from "../repository/mapper.ts";

import { honorariosErrors } from "../errors.ts";

/** Crea un honorario */
export const createHonorarioService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreateHonorarioSchema>,
): Promise<HonorarioDetail> => {
  const honorarioRaw = await findHonorarioBasicRawByIdentity(prisma, {
    asignacion_id: input.asignacion_id,
  });
  if (honorarioRaw) {
    throw honorariosErrors.alreadyExists;
  }

  const { id: honorario_id } = await createHonorarioAggregate(prisma, input);
  const honorarioCreatedRaw = await findHonorarioDetailRawById(
    prisma,
    honorario_id,
  );

  return toHonorarioDetail(honorarioCreatedRaw!);
};
