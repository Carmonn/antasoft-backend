import { z } from "@hono/zod-openapi";
import { PermisoBasicRawSchema } from "./repository.ts";

export const PermisoBasicSchema = PermisoBasicRawSchema.omit({
  asignable: true,
}).openapi({
  description: "Informacion basica de un permiso.",
});

export const ListPermisoBasicSchema = z.array(PermisoBasicSchema).openapi({
  description: "Lista de permisos disponibles.",
});
