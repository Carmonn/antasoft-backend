import { z } from "@hono/zod-openapi";
import {
  MunicipioBasicRawSchema,
  MunicipioDetailRawSchema,
} from "./repository.ts";

export const MunicipioBasicSchema = MunicipioBasicRawSchema.openapi({
  description: "Informacion basica de un municipio.",
});

export const MunicipioDetailSchema = MunicipioDetailRawSchema.omit({
  estado_id: true,
}).openapi({
  description:
    "Informacion detallada de un municipio especifico junto con su estado.",
});

export const ListMunicipioBasicSchema = z.array(MunicipioBasicSchema).openapi({
  description: "Lista de municipios.",
});

export const ListMunicipioDetailSchema = z
  .array(MunicipioDetailSchema)
  .openapi({
    description: "Lista de municipios disponibles con informacion.",
  });
