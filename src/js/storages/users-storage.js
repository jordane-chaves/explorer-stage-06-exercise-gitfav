/**
 * @typedef User
 * @property {string} login
 * @property {string} name
 * @property {number} public_repos
 * @property {number} followers
 */

export class UsersStorage {
  #STORAGE_KEY = '@GitFav-favorites'

  /**
   * @type {User[]}
   */
  #items = []

  constructor() {
    this.#load()
  }

  #load() {
    this.#items = JSON.parse(localStorage.getItem(this.#STORAGE_KEY)) || []
  }

  #persist() {
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(this.items))
  }

  get items() {
    return this.#items
  }

  /**
   * @param {User} user
   */
  insert(user) {
    this.#items = [user, ...this.#items]
    this.#persist()
  }

  /**
   * @param {User} user
   */
  delete(user) {
    const filteredItems = this.#items.filter(item => item.login !== user.login)

    this.#items = filteredItems
    this.#persist()
  }
}
