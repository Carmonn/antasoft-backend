import { z } from "@hono/zod-openapi";
import { EstadoBasicRawSchema, EstadoDetailRawSchema } from "./repository.ts";
import { MunicipioBasicRawSchema } from "@/modules/municipios/schemas/repository.ts";

export const EstadoBasicSchema = EstadoBasicRawSchema.openapi({
  description: "Informacion basica de un estado.",
});

export const EstadoDetailSchema = EstadoDetailRawSchema.omit({
  municipios: true,
}).extend({
  municipios: z.array(MunicipioBasicRawSchema.omit({ estado_id: true })),
});

export const ListEstadoBasicSchema = z.array(EstadoBasicSchema).openapi({
  description: "Lista de estados disponibles.",
});

export const ListEstadoDetailSchema = z.array(EstadoDetailSchema).openapi({
  description: "Lista de estados disponibles con informacion detallada.",
});
