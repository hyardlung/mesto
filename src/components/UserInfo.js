// класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
  }

  // возвращает объект с данными пользователя для вставки в форму при открытии
  getUserInfo() {
    const userInfo = {
      name: this._userNameSelector.textContent,
      about: this._userAboutSelector.textContent
    }
    return userInfo
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputName, inputAbout) {
    this._userNameSelector.textContent = inputName.value;
    this._userAboutSelector.textContent = inputAbout.value;
  }
}
