// класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo(data) {
    const userInfo = {
      name: data.name,
      about: data.about
    }
    return userInfo
  }

  // сохраняет данные с сервера в инпуты
  saveUserInfo(data, nameInput, aboutInput) {
    nameInput.value = data.name;
    aboutInput.value = data.about;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userAboutElement.textContent = data.about;
    this._userAvatarElement.setAttribute('src', data.avatar);
  }
}
