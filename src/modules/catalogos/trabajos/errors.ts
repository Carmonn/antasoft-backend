import { AppError } from "@/shared/AppError.ts";

export const trabajosErrors = {
  notFound: new AppError("NOT_FOUND", "Trabajo no encontrado", 404),
};
