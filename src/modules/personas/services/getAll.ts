import { PrismaClient } from "@/generated/client.ts";

import { listPersonasBasicRaw } from "../repository/read.ts";
import { toPersonaBasic } from "../repository/mapper.ts";

/** Lista personas */
export const listPersonasService = async (prisma: PrismaClient) => {
  return (await listPersonasBasicRaw(prisma)).map(toPersonaBasic);
};
