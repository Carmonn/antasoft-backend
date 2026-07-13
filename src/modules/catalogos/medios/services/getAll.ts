import { PrismaClient } from "@/generated/client.ts";
import { listMediosBasicRaw } from "../repository/read.ts";

/** Lista medios */
export const listMediosService = async (prisma: PrismaClient) => {
  return await listMediosBasicRaw(prisma);
};
