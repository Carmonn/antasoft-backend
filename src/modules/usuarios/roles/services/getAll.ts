import { PrismaClient } from "@/generated/client.ts";

import { listRolesBasicRaw } from "../repository/read.ts";
import { toRolBasic } from "../repository/mapper.ts";

/** Lista roles */
export const listRolesService = async (prisma: PrismaClient) => {
  return (
    await listRolesBasicRaw(prisma, {
      where: { asignable: true },
    })
  ).map(toRolBasic);
};
