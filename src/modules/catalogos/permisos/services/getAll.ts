import { PrismaClient } from "@/generated/client.ts";
import { listPermisosBasicRaw } from "../repository/read.ts";

import { toPermisoBasic } from "../repository/mapper.ts";

/** Lista permisos */
export const listPermisosService = async (prisma: PrismaClient) => {
  return (await listPermisosBasicRaw(prisma)).map(toPermisoBasic);
};
