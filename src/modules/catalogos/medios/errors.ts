import { AppError } from "@/shared/AppError.ts";

export const mediosErrors = {
  notFound: new AppError("NOT_FOUND", "Medio no encontrado", 404),
};
