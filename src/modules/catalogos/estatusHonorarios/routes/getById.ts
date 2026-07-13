import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { EstatusHonorarioBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";
import { estatusHonorariosErrors } from "../errors.ts";

export const getEstatusHonorariosByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Catalogos: Estatus de Honorarios"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(EstatusHonorarioBasicSchema),
        },
      },
      description:
        "Obtiene la información detallada de un estatus de honorario específico",
    },
    ...toErrorSchema(estatusHonorariosErrors.notFound),
  },
});
