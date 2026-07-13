import { AppError } from "@/shared/AppError.ts";

export const estatusAsignacionesErrors = {
  notFound: new AppError(
    "NOT_FOUND",
    "Estatus de asignación no encontrado",
    404,
  ),
};
