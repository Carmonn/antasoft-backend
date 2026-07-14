import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { PersonaDetailSchema } from "../schemas/response.ts";
import { personasErrors } from "../errors.ts";

export const deletePersonasRoute = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Personas"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(PersonaDetailSchema),
        },
      },
      description: "Elimina una persona",
    },
    ...toErrorSchema(personasErrors.notFound),
  },
});
