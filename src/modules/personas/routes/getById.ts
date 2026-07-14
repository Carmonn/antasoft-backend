import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { PersonaDetailSchema } from "../schemas/response.ts";
import { personasErrors } from "../errors.ts";

export const getPersonasByIdRoute = createRoute({
  method: "get",
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
      description: "Obtiene la información detallada de una persona específica",
    },
    ...toErrorSchema(personasErrors.notFound),
  },
});
