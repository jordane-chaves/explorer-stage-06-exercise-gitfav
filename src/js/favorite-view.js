import { Favorite } from "./favorite.js"

export class FavoriteView extends Favorite {
  #elements = {
    /** @type {Element} */
    root: null,
    /** @type {Element} */
    users: null,
    /** @type {HTMLButtonElement} */
    favoriteButton: null,
    /** @type {HTMLInputElement} */
    inputSearch: null,
  }

  /**
   * @param {Element} root
   */
  constructor(root) {
    super()

    this.#elements = {
      users: root.querySelector('.users'),
      favoriteButton: root.querySelector('.search button'),
      inputSearch: root.querySelector('.search #input-search'),
      root,
    }

    this.#update()
    this.#onFavorite()
  }

  #onFavorite() {
    this.#elements.favoriteButton.onclick = async () => {
      const { value } = this.#elements.inputSearch

      this.#elements.inputSearch.value = ''
      this.#elements.inputSearch.focus()

      await this.add(value)
      this.#update()
    }
  }

  #update() {
    this.#removeAllRows()

    this.items.forEach(user => {
      const row = this.#createRow(user)
      this.#elements.users.append(row)
    })
  }

  #createRow(user) {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img
          src="https://github.com/${user.login}.png"
          alt="Imagem de ${user.name}"
        />

        <a href="https://github.com/${user.login}" target="_blank">
          <p>${user.name}</p>
          <span>/${user.login}</span>
        </a>
      </td>

      <td class="repos">${user.public_repos}</td>
      <td class="followers">${user.followers}</td>
      <td>
        <button class="remove">Remover</button>
      </td>
    `

    tr.querySelector('.remove').onclick = () => {
      this.remove(user.login)
      this.#update()
    }

    return tr
  }

  #removeAllRows() {
    this.#elements.users
      .querySelectorAll('tr')
      .forEach(row => row.remove())
  }
}
