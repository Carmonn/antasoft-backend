import { AppError } from "@/shared/AppError.ts";

export const asignacionesErrors = {
  notFound: new AppError("NOT_FOUND", "Asignación no encontrada", 404),
  alreadyExists: new AppError("ALREADY_EXISTS", "Asignación ya existe", 409),
};
