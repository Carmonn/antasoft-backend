import { AppError } from "@/shared/AppError.ts";

export const estatusHonorariosErrors = {
  notFound: new AppError(
    "NOT_FOUND",
    "Estatus de honorario no encontrado",
    404,
  ),
};
