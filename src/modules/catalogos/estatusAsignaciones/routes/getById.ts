import { createRoute } from "@hono/zod-openapi";
import { IdParamsSchema } from "@/shared/schemas.ts";
import { EstatusAsignacionBasicSchema } from "../schemas/response.ts";

import { ApiSuccessSchema as success } from "@/shared/schemas.ts";
import { toErrorSchema } from "@/shared/mapper.ts";
import { estatusAsignacionesErrors } from "../errors.ts";

export const getEstatusAsignacionesByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Catalogos: Estatus de Asignaciónes"],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: success(EstatusAsignacionBasicSchema),
        },
      },
      description:
        "Obtiene la información detallada de un estatus de asignación específico",
    },
    ...toErrorSchema(estatusAsignacionesErrors.notFound),
  },
});
