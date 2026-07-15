import { Prisma, PrismaClient } from "@/generated/client.ts";

import type {
  UsuarioBasicRaw,
  UsuarioDetailRaw,
} from "../schemas/repository.ts";

import { personaDetailInclude } from "@/modules/personas/repository/read.ts";
import { rolDetailInclude } from "@/modules/usuarios/roles/repository/read.ts";

// ----- Parametros consulta -----
export const usuarioBasicInclude = {
  rol: {
    include: rolDetailInclude,
  },
  permisos: {
    include: {
      permiso: true,
    },
  },
} as const;

export const usuarioDetailInclude = {
  persona: {
    include: personaDetailInclude,
  },
  rol: {
    include: rolDetailInclude,
  },
  permisos: {
    include: {
      permiso: true,
    },
  },
} as const;

// ----- Consultas -----
/** Busca un usuario básico, se le tiene que pasar los parametros de consulta */
export const findUsuarioBasicRaw = async (
  prisma: PrismaClient,
  options: Prisma.usuariosFindFirstArgs,
): Promise<UsuarioBasicRaw | null> => {
  return await prisma.usuarios.findFirst({
    ...options,
    include: usuarioBasicInclude,
  });
};
/** Busca un usuario básico por su ID. */
export const findUsuarioBasicRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.usuariosFindUniqueArgs,
): Promise<UsuarioBasicRaw | null> => {
  return await prisma.usuarios.findUnique({
    where: { id },
    ...options,
    include: usuarioBasicInclude,
  });
};
/** Busca un usuario básico por su identidad unica en formato raw. */
export const findUsuarioBasicRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    correo: string | undefined;
  },
  options?: Prisma.usuariosFindFirstArgs,
): Promise<UsuarioBasicRaw | null> => {
  return await prisma.usuarios.findFirst({
    where: {
      correo: identity.correo,
    },
    ...options,
    include: usuarioBasicInclude,
  });
};

/** Busca un usuario detallado, se le tiene que pasar los parametros de consulta */
export const findUsuarioDetailRaw = async (
  prisma: PrismaClient,
  options: Prisma.usuariosFindFirstArgs,
): Promise<UsuarioDetailRaw | null> => {
  return await prisma.usuarios.findFirst({
    ...options,
    include: usuarioDetailInclude,
  });
};
/** Busca un usuario detallado por su ID. */
export const findUsuarioDetailRawById = async (
  prisma: PrismaClient,
  id: number,
  options?: Prisma.usuariosFindUniqueArgs,
): Promise<UsuarioDetailRaw | null> => {
  return await prisma.usuarios.findUnique({
    where: { id },
    ...options,
    include: usuarioDetailInclude,
  });
};
/** Busca un usuario detallado por su identidad en formato raw. */
export const findUsuarioDetailRawByIdentity = async (
  prisma: PrismaClient,
  identity: {
    correo: string | undefined;
  },
  options?: Prisma.usuariosFindFirstArgs,
): Promise<UsuarioDetailRaw | null> => {
  return await prisma.usuarios.findFirst({
    where: {
      correo: identity.correo,
    },
    ...options,
    include: usuarioDetailInclude,
  });
};

/** Lista los usuarios básicos */
export const listUsuariosBasicRaw = async (
  prisma: PrismaClient,
  options?: Prisma.usuariosFindManyArgs,
): Promise<UsuarioBasicRaw[]> => {
  return await prisma.usuarios.findMany({
    ...options,
    include: usuarioBasicInclude,
  });
};
/** Lista los usuarios detallados */
export const listUsuariosDetailRaw = async (
  prisma: PrismaClient,
  options?: Prisma.usuariosFindManyArgs,
): Promise<UsuarioDetailRaw[]> => {
  return await prisma.usuarios.findMany({
    ...options,
    include: usuarioDetailInclude,
  });
};
