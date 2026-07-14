import { PrismaClient } from "@/generated/client.ts";

import type { PersonaDetail } from "../schemas/response.ts";

import { findPersonaDetailRawById } from "../repository/read.ts";
import { deletePersonaAggregate } from "../repository/write.ts";
import { toPersonaDetail } from "../repository/mapper.ts";

import { personasErrors } from "../errors.ts";

/** Elimina una persona */
export const deletePersonaService = async (
  prisma: PrismaClient,
  id: number,
): Promise<PersonaDetail> => {
  const personaRaw = await findPersonaDetailRawById(prisma, id);

  if (!personaRaw) {
    throw personasErrors.notFound;
  }
  await deletePersonaAggregate(prisma, id);

  return toPersonaDetail(personaRaw);
};
