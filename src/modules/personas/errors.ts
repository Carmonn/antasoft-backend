import { AppError } from "@/shared/AppError.ts";

export const personasErrors = {
  notFound: new AppError("NOT_FOUND", "Persona no encontrado", 404),
  alreadyExists: new AppError("ALREADY_EXISTS", "Persona ya existe", 409),
};
