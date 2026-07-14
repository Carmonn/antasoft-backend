import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { UpdatePersonaSchema } from "../schemas/request.ts";
import type { PersonaDetail } from "../schemas/response.ts";

import {
  findPersonaBasicRawById,
  findPersonaDetailRawById,
  findPersonaBasicRawByIdentity,
} from "../repository/read.ts";
import { updatePersonaAggregate } from "../repository/write.ts";
import { toPersonaDetail } from "../repository/mapper.ts";

import { personasErrors } from "../errors.ts";

/** Actualiza una persona aplicando reglas de negocio y scope. */
export const updatePersonaService = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdatePersonaSchema>,
): Promise<PersonaDetail> => {
  const personaRaw = await findPersonaBasicRawById(prisma, id);
  if (!personaRaw) {
    throw personasErrors.notFound;
  }

  const personaRawDuplicate = await findPersonaBasicRawByIdentity(prisma, {
    alias: input.alias,
    nombre: input.nombre,
    apellido_paterno: input.apellido_paterno,
    apellido_materno: input.apellido_materno,
  });
  if (personaRawDuplicate && personaRawDuplicate.id !== id) {
    throw personasErrors.alreadyExists;
  }
  const { id: persona_id } = await updatePersonaAggregate(prisma, id, input);
  const personaUpdatedRaw = await findPersonaDetailRawById(prisma, persona_id);

  return toPersonaDetail(personaUpdatedRaw!);
};
