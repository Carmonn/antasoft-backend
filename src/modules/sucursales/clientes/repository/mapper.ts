import { z } from "@hono/zod-openapi";

import type {
  ClienteBasicRaw,
  ClienteDetailRaw,
} from "../schemas/repository.ts";

import {
  ClienteBasicSchema,
  ClienteDetailSchema,
} from "../schemas/response.ts";

/** Convierte ClienteBasicRaw a una respuesta pública. */
export const toClienteBasic = (
  clienteRaw: ClienteBasicRaw,
): z.infer<typeof ClienteBasicSchema> => {
  return { ...clienteRaw };
};

/** Convierte ClienteDetailRaw a una respuesta pública. */
export const toClienteDetail = (
  clienteRaw: ClienteDetailRaw,
): z.infer<typeof ClienteDetailSchema> => {
  const { identificadores: identificadoresRaw, ...cliente } = clienteRaw;

  const identificadores = identificadoresRaw.map(
    ({ cliente_id: __, ...identificador }) => identificador,
  );

  return {
    ...cliente,
    identificadores,
  };
};
