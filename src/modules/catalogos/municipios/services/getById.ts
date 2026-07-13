import { PrismaClient } from "@/generated/client.ts";

import { findMunicipioDetailRawById } from "../repository/read.ts";
import { toMunicipioDetail } from "../repository/mapper.ts";

import { municipiosErrors } from "../errors.ts";

/** Obtiene un estado por id y lo transforma al formato publico de respuesta. */
export const getMunicipioByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const municipioRaw = await findMunicipioDetailRawById(prisma, id);
  if (!municipioRaw) {
    throw municipiosErrors.notFound;
  }
  return toMunicipioDetail(municipioRaw);
};
