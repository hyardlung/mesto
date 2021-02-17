// класс отвечает за открытие/закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleCrossClose = this._handleCrossClose.bind(this);
  }

  //открытие попапа
  open() {
    // обработчик нажатия на Esc
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  // закрытие попапа
  close() {
    // удаляем обработчик нажатия на Esc
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  // закрытие попапа по нажатию на Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  // закрытие попапа по клику на оверлей
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  };

  // закрытие попапа по нажатию на крестик
  _handleCrossClose() {
    this.close();
  };

  // метод добавления листнеров
  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClose);  // обработчик клика мимо окна
    this._closeButton.addEventListener('click', this._handleCrossClose);  // обработчик клика по крестику
  }
}
