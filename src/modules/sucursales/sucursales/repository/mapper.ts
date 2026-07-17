import { z } from "@hono/zod-openapi";

import type {
  SucursalBasicRaw,
  SucursalDetailRaw,
} from "../schemas/repository.ts";

import {
  SucursalBasicSchema,
  SucursalDetailSchema,
} from "../schemas/response.ts";

import { toMunicipioDetail } from "@/modules/catalogos/municipios/repository/mapper.ts";
import { toClienteDetail } from "@/modules/sucursales/clientes/repository/mapper.ts";

/** Convierte SucursalBasicRaw a una respuesta pública. */
export const toSucursalBasic = (
  sucursalRaw: SucursalBasicRaw,
): z.infer<typeof SucursalBasicSchema> => {
  const { clave_signature: _, ...sucursal } = sucursalRaw;
  return { ...sucursal };
};

/** Convierte SucursalDetailRaw a una respuesta pública. */
export const toSucursalDetail = (
  sucursalRaw: SucursalDetailRaw,
): z.infer<typeof SucursalDetailSchema> => {
  const {
    cliente_id: _,
    municipio_id: __,
    clave_signature: ___,
    municipio: municipioRaw,
    cliente: clienteRaw,
    claves: clavesRaw,
    ...sucursal
  } = sucursalRaw;

  const municipio = toMunicipioDetail(municipioRaw);
  const cliente = toClienteDetail(clienteRaw);

  const claves = clavesRaw.map(
    ({ sucursal_id: _, identificador, ...claveRaw }) => ({
      ...claveRaw,
      identificador_nombre: identificador.nombre,
    }),
  );

  return {
    ...sucursal,
    municipio,
    cliente,
    claves,
  };
};
