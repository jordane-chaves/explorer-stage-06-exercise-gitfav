import { GithubUsers } from './services/github-users.js'
import { UsersStorage } from './storages/users-storage.js'

export class Favorite {
  /** @type {UsersStorage} */
  #storage = null

  constructor() {
    this.#storage = new UsersStorage()
  }

  get items() {
    return this.#storage.items
  }

  /**
   * @param {string} username
   */
  async add(username) {
    try {
      if (!username) {
        throw new Error('Informe o usuário.')
      }

      const userAlreadyExists = this.#storage.items
        .find(item => item.login === username)

      if (userAlreadyExists) {
        throw new Error('Usuário já existe.')
      }

      const user = await GithubUsers.search(username)

      const userWasFound = user && user.login

      if (!userWasFound) {
        throw new Error('Usuário não encontrado.')
      }

      this.#storage.insert(user)
    } catch (error) {
      alert(error.message)
    }
  }

  /**
   * @param {string} username
   */
  remove(username) {
    const user = this.#storage.items.find(item => item.login === username)

    this.#storage.delete(user)
  }
}
