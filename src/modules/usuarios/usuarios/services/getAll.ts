import { PrismaClient } from "@/generated/client.ts";

import { listUsuariosBasicRaw } from "../repository/read.ts";
import { toUsuarioBasic } from "../repository/mapper.ts";

/** Lista usuarios */
export const listUsuariosService = async (prisma: PrismaClient) => {
  return (await listUsuariosBasicRaw(prisma)).map(toUsuarioBasic);
};
