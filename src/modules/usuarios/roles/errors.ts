import { AppError } from "@/shared/AppError.ts";

export const rolesErrors = {
  notFound: new AppError("NOT_FOUND", "Rol no encontrado", 404),
  notFoundPermiso: new AppError("NOT_FOUND", "Permiso no encontrado", 404),
  alreadyExists: new AppError("ALREADY_EXISTS", "Rol ya existe", 409),
};
