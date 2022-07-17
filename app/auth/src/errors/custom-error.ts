abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeError(): {
    message: string;
    field?: string;
  }[];
}

export { CustomError };
