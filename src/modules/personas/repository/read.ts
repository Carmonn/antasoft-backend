import { PrismaClient } from "@/generated/client.ts";

import type {
  PersonaBasicRaw,
  PersonaDetailRaw,
} from "../schemas/repository.ts";

// ----- Parametros consulta -----
export const personaBasicInclude = {
  contactos: {
    include: {
      medio: true,
    },
  },
} as const;

export const personaDetailInclude = {
  contactos: {
    include: {
      medio: true,
    },
  },
  cobertura: {
    include: {
      municipio: {
        include: {
          estado: true,
        },
      },
    },
  },
} as const;

// ----- Consultas -----
/** Busca una persona básica por su ID. */
export const findPersonaBasicRawById = async (
  prisma: PrismaClient,
  id: number,
): Promise<PersonaBasicRaw | null> => {
  return await prisma.personas.findUnique({
    where: { id },
    include: personaBasicInclude,
  });
};
/** Busca una persona basica por su identidad unica en formato raw. */
export const findPersonaBasicRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    alias: string | undefined;
    nombre: string | undefined;
    apellido_paterno: string | undefined | null;
    apellido_materno: string | undefined | null;
  },
): Promise<PersonaBasicRaw | null> => {
  return await prisma.personas.findFirst({
    where: {
      alias: identity.alias,
      nombre: identity.nombre,
      apellido_paterno: identity.apellido_paterno,
      apellido_materno: identity.apellido_materno,
    },
    include: personaBasicInclude,
  });
};

/** Busca una persona detallada por su ID. */
export const findPersonaDetailRawById = async (
  prisma: PrismaClient,
  id: number,
): Promise<PersonaDetailRaw | null> => {
  return await prisma.personas.findUnique({
    where: { id },
    include: personaDetailInclude,
  });
};
/** Busca una persona de detalle por identidad en formato raw. */
export const findPersonaDetailRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    alias: string | undefined;
    nombre: string | undefined;
    apellido_paterno: string | undefined | null;
    apellido_materno: string | undefined | null;
  },
): Promise<PersonaDetailRaw | null> => {
  return await prisma.personas.findFirst({
    where: {
      alias: identity.alias,
      nombre: identity.nombre,
      apellido_paterno: identity.apellido_paterno,
      apellido_materno: identity.apellido_materno,
    },
    include: personaDetailInclude,
  });
};

/** Lista las personas básicas */
export const listPersonasBasicRaw = async (
  prisma: PrismaClient,
): Promise<PersonaBasicRaw[]> => {
  return await prisma.personas.findMany({ include: personaBasicInclude });
};
/** Lista las personas detalladas */
export const listPersonasDetailRaw = async (
  prisma: PrismaClient,
): Promise<PersonaDetailRaw[]> => {
  return await prisma.personas.findMany({
    include: personaDetailInclude,
  });
};
