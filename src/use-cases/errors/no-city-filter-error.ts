export class NoCityFilterError extends Error {
  constructor() {
    super("You must filter at least by city");
  }
}
