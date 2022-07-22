import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Current User is not found');

    Object.setPrototypeOf(this, NotAuthorizedError);
  }

  serializeError() {
    return [{ message: 'Not authorized' }];
  }
}
