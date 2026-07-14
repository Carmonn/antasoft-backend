import { z } from "@hono/zod-openapi";

import type {
  PersonaBasicRaw,
  PersonaDetailRaw,
} from "../schemas/repository.ts";

import {
  PersonaBasicSchema,
  PersonaDetailSchema,
} from "../schemas/response.ts";

/** Convierte PersonaBasicRaw a una respuesta pública. */
export const toPersonaBasic = (
  personaRaw: PersonaBasicRaw,
): z.infer<typeof PersonaBasicSchema> => {
  const { contactos: contactosRaw, ...persona } = personaRaw;
  const contactos = contactosRaw.map(
    ({ medio_id: _, persona_id: __, ...contacto }) => contacto,
  );
  return {
    ...persona,
    contactos,
  };
};

/** Convierte PersonaDetailRaw a una respuesta pública. */
export const toPersonaDetail = (
  personaRaw: PersonaDetailRaw,
): z.infer<typeof PersonaDetailSchema> => {
  const {
    contactos: contactosRaw,
    cobertura: coberturaRaw,
    ...persona
  } = personaRaw;
  const contactos = contactosRaw.map(
    ({ medio_id: _, persona_id: __, ...contacto }) => contacto,
  );

  const coberturaMap = new Map<
    number,
    z.infer<typeof PersonaDetailSchema>["cobertura"][number]
  >();
  for (const cobertura of coberturaRaw) {
    const { municipio } = cobertura;
    const { estado } = municipio;

    if (!coberturaMap.has(estado.id)) {
      coberturaMap.set(estado.id, {
        id: estado.id,
        nombre: estado.nombre,
        clave: estado.clave,
        abreviatura: estado.abreviatura,
        municipios: [],
      });
    }

    coberturaMap.get(estado.id)!.municipios.push({
      id: municipio.id,
      nombre: municipio.nombre,
      clave: municipio.clave,
    });
  }

  return {
    ...persona,
    contactos,
    cobertura: [...coberturaMap.values()],
  };
};
