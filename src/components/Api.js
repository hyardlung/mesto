export default class Api {
  constructor(params) {
    this._url = params.url;
    this._headers = params.headers;
    // this._body = body;
    // this._users = users;
    // this._me = me;
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

  sendCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(name, link)
    }).then(this.getResponse)
  }
}
