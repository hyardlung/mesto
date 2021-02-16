export default class Api {
  constructor(params) {
    this._url = params.url;
    this._headers = params.headers;
    // this._body = body;
    // this._users = users;
    // this._me = me;
  }

  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`)
  }

  getRemoteCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    }).then(this.getResponse)
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    }).then(this.getResponse)
  }
}
