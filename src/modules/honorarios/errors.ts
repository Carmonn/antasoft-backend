import { AppError } from "@/shared/AppError.ts";

export const honorariosErrors = {
  notFound: new AppError("NOT_FOUND", "Honorario no encontrado", 404),
  alreadyExists: new AppError("ALREADY_EXISTS", "Honorario ya existe", 409),
};
