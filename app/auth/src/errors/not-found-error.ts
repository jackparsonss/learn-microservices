import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = "Route not found";

  constructor() {
    super("Route not found");

    // because we are extending a built-in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}
