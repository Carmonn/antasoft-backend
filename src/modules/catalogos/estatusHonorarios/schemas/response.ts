import { z } from "@hono/zod-openapi";
import { EstatusHonorarioBasicRawSchema } from "./repository.ts";

export const EstatusHonorarioBasicSchema =
  EstatusHonorarioBasicRawSchema.openapi({
    description: "Informacion basica de un estatus de honorario.",
  });

export const ListEstatusHonorarioBasicSchema = z
  .array(EstatusHonorarioBasicSchema)
  .openapi({
    description: "Lista de estatus de honorario disponibles.",
  });
