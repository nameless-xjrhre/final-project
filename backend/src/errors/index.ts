export class CustomError extends Error {
  public details: Array<string>

  private constructor(details: Array<string>) {
    super(String(details))
    this.details = details
  }

  public static of(details: Array<string>): CustomError {
    return new CustomError(details)
  }
}
