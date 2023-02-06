export class MyCustomError extends Error {
  name = 'Server Error';

  status: number;

  message: string;

  code?: number;

  constructor(status: number, message: string, code?: number) {
    super(message);
    this.message = message;
    this.status = status;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
