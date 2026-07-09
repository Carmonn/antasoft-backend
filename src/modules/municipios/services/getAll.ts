import { PrismaClient } from "@/generated/client.ts";
import { listMunicipiosBasicRaw } from "../repository/read.ts";

/** Lista municipios */
export const listMunicipiosService = async (prisma: PrismaClient) => {
  return await listMunicipiosBasicRaw(prisma);
};
