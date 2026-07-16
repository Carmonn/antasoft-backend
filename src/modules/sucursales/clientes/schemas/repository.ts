import { z } from "@hono/zod-openapi";

import { ClienteRawSchema, IdentificadorRawSchema } from "./raw.ts";

// ----- Repository response read Schemas -----
export const ClienteBasicRawSchema = ClienteRawSchema;

export const ClienteDetailRawSchema = ClienteRawSchema.extend({
  identificadores: z.array(IdentificadorRawSchema),
});

// ----- Types -----
export type ClienteBasicRaw = z.infer<typeof ClienteBasicRawSchema>;
export type ClienteDetailRaw = z.infer<typeof ClienteDetailRawSchema>;
