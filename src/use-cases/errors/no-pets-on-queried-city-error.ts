export class NoPetsOnQueriedCityError extends Error {
  constructor() {
    super("There's no pets on this city");
  }
}
