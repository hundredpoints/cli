export class CliError extends Error {
  public description!: string | undefined;
  public name = "HundredpointsCliError";

  constructor(message: string, description?: string) {
    super(message);
    this.description = description;

    // This is needed for typescript to correctly pass the prototype
    Object.setPrototypeOf(this, CliError.prototype);
  }
}
