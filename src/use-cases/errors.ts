// -> ORGS
export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("Uma organização com esse nome ou email já existe.")
  }
}
