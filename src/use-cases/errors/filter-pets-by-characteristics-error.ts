export class FilterPetsByCharacteristicsError extends Error {
  constructor() {
    super("No pet found with this filters");
  }
}
