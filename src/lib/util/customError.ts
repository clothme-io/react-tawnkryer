export class CustomError extends Error {
  private status: number
  private value?: any
  message: string

  constructor(status: number, message: string, value?: any) {
    super(message)
    this.message = message
    this.status = status
    this.value = value
    // Because we extending the built in Error
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    this.message
  }

  getValue() {
    return this.value
  }
}
