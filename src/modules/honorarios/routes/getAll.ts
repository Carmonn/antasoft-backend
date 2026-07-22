import { createRoute } from "@hono/zod-openapi";
import { ApiSuccessSchema as success } from "@/shared/schemas.ts";

import { ListHonorarioDetailSchema } from "../schemas/response.ts";

export const getAllHonorariosRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Honorarios"],
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(ListHonorarioDetailSchema),
        },
      },
      description: "Obtiene todos los honorarios",
    },
  },
});
