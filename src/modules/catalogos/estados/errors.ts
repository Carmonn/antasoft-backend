import { AppError } from "@/shared/AppError.ts";

export const estadosErrors = {
  notFound: new AppError("NOT_FOUND", "Estado no encontrado", 404),
};
