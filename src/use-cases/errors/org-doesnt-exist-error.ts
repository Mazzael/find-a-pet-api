export class OrgDoesntExistError extends Error {
  constructor() {
    super("Org doesn't exists");
  }
}
