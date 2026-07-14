import { Prisma, PrismaClient } from "@/generated/client.ts";
import { listPermisosBasicRaw } from "../repository/read.ts";

import { toPermisoBasic } from "../repository/mapper.ts";

/** Lista permisos */
export const listPermisosService = async (prisma: PrismaClient) => {
  const queryOptions = {
    where: {
      asignable: true,
    },
  } as Prisma.permisosFindManyArgs;

  return (await listPermisosBasicRaw(prisma, queryOptions)).map(toPermisoBasic);
};
