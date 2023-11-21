export class PetDoesntExistError extends Error {
  constructor() {
    super("Pet doesn't exists");
  }
}
