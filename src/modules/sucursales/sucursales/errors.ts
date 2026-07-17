import { AppError } from "@/shared/AppError.ts";

export const sucursalesErrors = {
  notFound: new AppError("NOT_FOUND", "Sucursal no encontrada", 404),
  alreadyExists: new AppError("ALREADY_EXISTS", "Sucursal ya existe", 409),
};
