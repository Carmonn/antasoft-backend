import { Prisma, PrismaClient } from "@/generated/client.ts";

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
/** Busca una persona básica, se le tiene que pasar los parametros de consulta */
export const findPersonaBasicRaw = async (
  prisma: PrismaClient,
  options: Prisma.personasFindFirstArgs,
): Promise<PersonaBasicRaw | null> => {
  return await prisma.personas.findFirst({
    ...options,
    include: personaBasicInclude,
  });
};
/** Busca una persona básica por su ID. */
export const findPersonaBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.personasFindUniqueArgs,
): Promise<PersonaBasicRaw | null> => {
  return await prisma.personas.findUnique({
    where: { id },
    ...options,
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
  options?: Prisma.personasFindFirstArgs,
): Promise<PersonaBasicRaw | null> => {
  return await prisma.personas.findFirst({
    where: {
      alias: identity.alias,
      nombre: identity.nombre,
      apellido_paterno: identity.apellido_paterno,
      apellido_materno: identity.apellido_materno,
    },
    ...options,
    include: personaBasicInclude,
  });
};

/** Busca una persona detallada, se le tiene que pasar los parametros de consulta */
export const findPersonaDetailRaw = async (
  prisma: PrismaClient,
  options: Prisma.personasFindFirstArgs,
): Promise<PersonaDetailRaw | null> => {
  return await prisma.personas.findFirst({
    ...options,
    include: personaDetailInclude,
  });
};
/** Busca una persona detallada por su ID. */
export const findPersonaDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.personasFindUniqueArgs,
): Promise<PersonaDetailRaw | null> => {
  return await prisma.personas.findUnique({
    where: { id },
    ...options,
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
  options?: Prisma.personasFindFirstArgs,
): Promise<PersonaDetailRaw | null> => {
  return await prisma.personas.findFirst({
    where: {
      alias: identity.alias,
      nombre: identity.nombre,
      apellido_paterno: identity.apellido_paterno,
      apellido_materno: identity.apellido_materno,
    },
    ...options,
    include: personaDetailInclude,
  });
};

/** Lista las personas básicas */
export const listPersonasBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.personasFindManyArgs,
): Promise<PersonaBasicRaw[]> => {
  return await prisma.personas.findMany({
    ...options,
    include: personaBasicInclude,
  });
};
/** Lista las personas detalladas */
export const listPersonasDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.personasFindManyArgs,
): Promise<PersonaDetailRaw[]> => {
  return await prisma.personas.findMany({
    ...options,
    include: personaDetailInclude,
  });
};
