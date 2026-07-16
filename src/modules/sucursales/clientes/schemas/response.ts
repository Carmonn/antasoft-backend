import { z } from "@hono/zod-openapi";

import { ClienteBasicRawSchema, ClienteDetailRawSchema } from "./repository.ts";

export const ClienteBasicSchema = ClienteBasicRawSchema.openapi({
  description: "Informacion basica de un cliente.",
});

export const ClienteDetailSchema = ClienteDetailRawSchema.extend({
  identificadores: z
    .array(
      ClienteDetailRawSchema.shape.identificadores.element.omit({
        cliente_id: true,
      }),
    )
    .openapi({
      description: "Lista de identificadores del cliente",
    }),
}).openapi({
  description: "Informacion detallada de un cliente.",
});

export const ListClienteBasicSchema = z.array(ClienteBasicSchema).openapi({
  description: "Lista de clientes disponibles.",
});

export const ListClienteDetailSchema = z.array(ClienteDetailSchema).openapi({
  description: "Lista de clientes con informacion detallada.",
});

// ----- Types -----
export type ClienteBasic = z.infer<typeof ClienteBasicSchema>;
export type ClienteDetail = z.infer<typeof ClienteDetailSchema>;
