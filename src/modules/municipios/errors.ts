import { AppError } from "@/shared/AppError.ts";

export const municipiosErrors = {
  notFound: new AppError("NOT_FOUND", "Municipio no encontrado", 404),
};
