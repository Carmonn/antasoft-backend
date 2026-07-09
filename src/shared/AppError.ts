type HttpStatus = 400 | 401 | 403 | 404 | 409 | 422 | 500;

export class AppError extends Error {
  readonly code: string;
  readonly status: HttpStatus;
  readonly details?: unknown;

  constructor(
    code: string,
    message: string,
    status: HttpStatus = 400,
    details?: unknown,
  ) {
    super(message);

    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  withDetails(details: unknown) {
    return new AppError(this.code, this.message, this.status, details);
  }
}
