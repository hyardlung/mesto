export default class Api {
  constructor(params) {
    this._url = params.url;
    this._headers = params.headers;
  }

  // проверка промиса, возврат json'а в случае резолва, возврат статуса ошибки в случае реджекта
  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`)
  }

  // запрос на получение данных своего профиля
  getUserData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    }).then(this.getResponse)
  }

  // запрос на редактирование данных профиля (тоже своего есессено)
  editUserData({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    }).then(this.getResponse)
  }

  // запрос карточек с сервера
  getRemoteCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    }).then(this.getResponse)
  }

  // запрос на добавление карточки на сервер
  sendCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(name, link)
    }).then(this.getResponse)
  }

  // запрос на удаление карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this.getResponse)
  }

  // запрос на добавление лайка карточке
  setLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then(this.getResponse)
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this.getResponse)
  }

  updateAvatar(imgUrl) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: imgUrl.avatarLink})
    }).then(this.getResponse)
  }
}






