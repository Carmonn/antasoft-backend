import { PrismaClient } from "@/generated/client.ts";

import { listMediosBasicRaw } from "../repository/read.ts";
import { toMedioBasic } from "../repository/mapper.ts";

/** Lista medios */
export const listMediosService = async (prisma: PrismaClient) => {
  return (await listMediosBasicRaw(prisma)).map(toMedioBasic);
};
