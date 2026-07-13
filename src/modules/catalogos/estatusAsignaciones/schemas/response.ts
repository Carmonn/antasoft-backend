import { z } from "@hono/zod-openapi";
import { EstatusAsignacionBasicRawSchema } from "./repository.ts";

export const EstatusAsignacionBasicSchema =
  EstatusAsignacionBasicRawSchema.openapi({
    description: "Informacion basica de un estatus de asignacion.",
  });

export const ListEstatusAsignacionBasicSchema = z
  .array(EstatusAsignacionBasicSchema)
  .openapi({
    description: "Lista de estatus de asignacion disponibles.",
  });
