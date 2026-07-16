import { AppError } from "@/shared/AppError.ts";

export const clientesErrors = {
  notFound: new AppError("NOT_FOUND", "Cliente no encontrado", 404),
  alreadyExists: new AppError("ALREADY_EXISTS", "Cliente ya existe", 409),
};
