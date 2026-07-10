import { AppError } from "@/shared/AppError.ts";

export const permisosErrors = {
  notFound: new AppError("NOT_FOUND", "Permiso no encontrado", 404),
};
