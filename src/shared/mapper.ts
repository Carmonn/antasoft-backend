export const toApiError = (
  code: string,
  message: string,
  details?: unknown,
  status: number = 400,
) => ({
  success: false as const,
  error: { code, message, details },
  status,
});

export const toApiSuccess = <T>(data: T, message?: string) => ({
  success: true as const,
  data,
  message,
});

// ----- Metodo para crear esquemas de error en la documentacion -----
import { AppError } from "./AppError.ts";
import { ApiErrorSchema } from "./schemas.ts";
export const toErrorSchema = (...errors: AppError[]) => {
  return Object.fromEntries(
    errors.map((error) => [
      error.status,
      {
        description: error.message,
        content: {
          "application/json": {
            schema: ApiErrorSchema,
          },
        },
      },
    ]),
  );
};
