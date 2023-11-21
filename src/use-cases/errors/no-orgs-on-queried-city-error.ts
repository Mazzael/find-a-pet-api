export class NoOrgsOnQueriedCityError extends Error {
  constructor() {
    super("There's no Orgs on this city");
  }
}
