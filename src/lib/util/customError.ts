export class CustomError extends Error {
  private status: number;

  private value?: unknown;

  message: string;

  constructor(status: number, message: string, value?: unknown) {
    super(message);
    this.message = message;
    this.status = status;
    this.value = value;
    // Because we extending the built in Error
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.message;
  }

  getValue() {
    return this.value;
  }
}
