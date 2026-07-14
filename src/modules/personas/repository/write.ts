import { z } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";

import {
  CreatePersonaSchema,
  UpdatePersonaSchema,
} from "../schemas/request.ts";
import type { PersonaRaw } from "../schemas/raw.ts";

// ----- Consultas -----
/** Crea una persona y sus relaciones de contacto/cobertura en una sola transaccion. */
export const createPersonaAggregate = async (
  prisma: PrismaClient,
  input: z.infer<typeof CreatePersonaSchema>,
): Promise<PersonaRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { medios_de_contacto, cobertura, ...personaData } = input;
    const persona = await tx.personas.create({ data: personaData });

    await tx.contactos.createMany({
      data: medios_de_contacto.map((item) => ({
        medio_id: item.medio_id,
        valor: item.valor,
        persona_id: persona.id,
      })),
    });

    await tx.personas_municipios.createMany({
      data: cobertura.map((municipio_id) => ({
        municipio_id,
        persona_id: persona.id,
      })),
    });

    return persona;
  });
};

/** Actualiza una persona y sincroniza relaciones de contacto/cobertura en transaccion. */
export const updatePersonaAggregate = async (
  prisma: PrismaClient,
  id: number,
  input: z.infer<typeof UpdatePersonaSchema>,
): Promise<PersonaRaw> => {
  return await prisma.$transaction(async (tx) => {
    const { medios_de_contacto, cobertura, ...personaData } = input;

    const persona = await tx.personas.update({
      where: { id },
      data: personaData,
    });

    if (medios_de_contacto !== undefined) {
      await tx.contactos.deleteMany({ where: { persona_id: id } });
      await tx.contactos.createMany({
        data: medios_de_contacto.map((item) => ({
          medio_id: item.medio_id,
          valor: item.valor,
          persona_id: id,
        })),
      });
    }

    if (cobertura !== undefined) {
      await tx.personas_municipios.deleteMany({ where: { persona_id: id } });
      await tx.personas_municipios.createMany({
        data: cobertura.map((municipio_id) => ({
          municipio_id,
          persona_id: id,
        })),
      });
    }

    return persona;
  });
};

/** Elimina una persona y limpia relaciones asociadas en transaccion. */
export const deletePersonaAggregate = async (
  prisma: PrismaClient,
  id: number,
): Promise<PersonaRaw> => {
  return await prisma.$transaction(async (tx) => {
    const persona = await tx.personas.delete({ where: { id } });

    await tx.contactos.deleteMany({ where: { persona_id: id } });
    await tx.personas_municipios.deleteMany({ where: { persona_id: id } });

    return persona;
  });
};
