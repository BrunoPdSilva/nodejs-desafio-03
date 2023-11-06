// -> ORGS
export class OrgNotFoundError extends Error {
  constructor() {
    super("Organização não encontrada.")
  }
}

export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("Uma organização com esse nome ou email já existe.")
  }
}

export class OrgWithSameNameAlreadyExistsError extends Error {
  constructor() {
    super("Uma organização com o mesmo nome já está cadastrada.")
  }
}

export class OrgWithSameEmailAlreadyExistsError extends Error {
  constructor() {
    super("Uma organização com o mesmo email já está cadastrada.")
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email ou senha incorretos.")
  }
}

// -> Pets

export class PetNotFoundError extends Error {
  constructor() {
    super("Desculpe, não encontramos nenhum pet com esse ID.")
  }
}

