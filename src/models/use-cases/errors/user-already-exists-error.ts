export class UserAlreadyExistsError extends Error {
  constructor() {
    super('🙅‍♂️ E-mail já existe!')
  }
}
