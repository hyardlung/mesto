// класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

  // возвращает объект с данными пользователя для вставки в форму при открытии
  getUserInfo() {
    return {
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputName, inputJob) {
    this._userName.textContent = inputName.value;
    this._userJob.textContent = inputJob.value;
  }
}
