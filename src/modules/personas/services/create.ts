import type { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import { CreatePersonaSchema } from "../schemas/request.ts";
import type { PersonaDetail } from "../schemas/response.ts";

import {
  findPersonaDetailRawById,
  findPersonaBasicRawByIdentity,
} from "../repository/read.ts";
import { createPersonaAggregate } from "../repository/write.ts";
import { toPersonaDetail } from "../repository/mapper.ts";

import { personasErrors } from "../errors.ts";

/** Crea una persona */
export const createPersonaService = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreatePersonaSchema>,
): Promise<PersonaDetail> => {
  const personaRaw = await findPersonaBasicRawByIdentity(prisma, {
    alias: input.alias,
    nombre: input.nombre,
    apellido_paterno: input.apellido_paterno ?? null,
    apellido_materno: input.apellido_materno ?? null,
  });
  if (personaRaw) {
    throw personasErrors.alreadyExists;
  }

  const { id: persona_id } = await createPersonaAggregate(prisma, input);
  const personaCreatedRaw = await findPersonaDetailRawById(prisma, persona_id);

  return toPersonaDetail(personaCreatedRaw!);
};
