import { z } from "@hono/zod-openapi";

export const ApiSuccessSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    success: z.literal(true),
    data: schema,
    message: z.string().optional(),
  });

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export const IdParamsSchema = z.object({
  id: z.coerce.number().int().positive().openapi({
    example: 1,
    description: "Identificador unico del recurso.",
  }),
});
