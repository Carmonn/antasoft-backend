import { Prisma, PrismaClient } from "@/generated/client.ts";

import { listRolesBasicRaw } from "../repository/read.ts";
import { toRolBasic } from "../repository/mapper.ts";

/** Lista roles */
export const listRolesService = async (prisma: PrismaClient) => {
  const queryOptions = {
    where: { asignable: true },
  } as Prisma.rolesFindManyArgs;
  return (await listRolesBasicRaw(prisma, queryOptions)).map(toRolBasic);
};
