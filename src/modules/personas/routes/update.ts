import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { PersonaDetailSchema } from "../schemas/response.ts";
import { UpdatePersonaSchema } from "../schemas/request.ts";
import { personasErrors } from "../errors.ts";

export const updatePersonasRoute = createRoute({
  method: "patch",
  path: "/:id",
  tags: ["Personas"],
  request: {
    params: IdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdatePersonaSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(PersonaDetailSchema),
        },
      },
      description: "Edita una persona",
    },
    ...toErrorSchema(personasErrors.notFound, personasErrors.alreadyExists),
  },
});
