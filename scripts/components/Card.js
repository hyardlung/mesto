const popupPreview = document.querySelector('.popup_preview');
const previewImage = popupPreview.querySelector('.preview__image');
const previewCaption = popupPreview.querySelector('.preview__caption');
const previewCloseButton = popupPreview.querySelector('.popup__close-button_preview');
export default class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  // забираем размеку из HTML и клонируем элемент
  _getTemplate() {
  	const templateCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return templateCard;
  }

  // подготовим карточку к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__heading').textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  // открытие предпросмотра изображения
  _handleOpenPopup() {
    previewImage.src = this._link;
    previewCaption.textContent = this._name;
    popupPreview.classList.add('popup_opened');
  }

  // закрытие предпросмотра по клику на крестик
  _handleClosePopup() {
    previewImage.src = '';
    previewCaption.textContent = '';
    popupPreview.classList.remove('popup_opened');
  }

  // слушатели кликов открытия и закрытия предпросмотра
  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    })
    previewCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    })
  }
}
