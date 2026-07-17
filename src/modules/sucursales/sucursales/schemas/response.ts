import { z } from "@hono/zod-openapi";

import {
  SucursalBasicRawSchema,
  SucursalDetailRawSchema,
} from "./repository.ts";

import { ClienteDetailSchema } from "@/modules/sucursales/clientes/schemas/response.ts";
import { MunicipioDetailSchema } from "@/modules/catalogos/municipios/schemas/response.ts";

export const SucursalBasicSchema = SucursalBasicRawSchema.omit({
  clave_signature: true,
}).openapi({
  description: "Informacion basica de una sucursal.",
});

export const SucursalDetailSchema = SucursalDetailRawSchema.omit({
  cliente_id: true,
  municipio_id: true,
  clave_signature: true,
})
  .extend({
    cliente: ClienteDetailSchema,
    municipio: MunicipioDetailSchema,
    claves: z.array(
      SucursalDetailRawSchema.shape.claves.element
        .omit({ sucursal_id: true, identificador: true })
        .extend({
          identificador_nombre:
            ClienteDetailSchema.shape.identificadores.element.shape.nombre,
        }),
    ),
  })
  .openapi({
    description: "Informacion detallada de una sucursal.",
  });

export const ListSucursalBasicSchema = z.array(SucursalBasicSchema).openapi({
  description: "Lista de sucursales disponibles.",
});

export const ListSucursalDetailSchema = z.array(SucursalDetailSchema).openapi({
  description: "Lista de sucursales con informacion detallada.",
});

// ----- Types -----
export type SucursalBasic = z.infer<typeof SucursalBasicSchema>;
export type SucursalDetail = z.infer<typeof SucursalDetailSchema>;
