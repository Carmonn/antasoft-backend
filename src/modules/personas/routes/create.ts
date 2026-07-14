import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";

import { PersonaDetailSchema } from "../schemas/response.ts";
import { CreatePersonaSchema } from "../schemas/request.ts";
import { personasErrors } from "../errors.ts";

export const createPersonasRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Personas"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreatePersonaSchema,
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
      description: "Crea una nueva persona",
    },
    ...toErrorSchema(personasErrors.alreadyExists),
  },
});
