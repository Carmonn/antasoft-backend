import { AppError } from "@/shared/AppError.ts";

export const usuariosErrors = {
  notFound: new AppError("NOT_FOUND", "Usuario no encontrado", 404),
  notFoundRoles: new AppError("NOT_FOUND", "Roles no encontrados", 404),
  alreadyExists: new AppError("ALREADY_EXISTS", "Usuario ya existe", 409),
};
