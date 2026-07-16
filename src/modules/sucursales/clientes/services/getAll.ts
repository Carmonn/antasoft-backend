import { PrismaClient } from "@/generated/client.ts";

import { listClientesDetailRaw } from "../repository/read.ts";
import { toClienteDetail } from "../repository/mapper.ts";

/** Lista personas */
export const listClientesService = async (prisma: PrismaClient) => {
  return (await listClientesDetailRaw(prisma)).map(toClienteDetail);
};
