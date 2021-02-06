// класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
  }

  // возвращает объект с данными пользователя для вставки в форму при открытии
  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent
    }
    return userInfo
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputName, inputAbout) {
    this._userNameElement.textContent = inputName.value;
    this._userAboutElement.textContent = inputAbout.value;
  }
}
