const popupPreview = document.querySelector('.popup_preview');

const previewImage = popupPreview.querySelector('.preview__image');
const previewCaption = popupPreview.querySelector('.preview__caption');
const previewCloseButton = popupPreview.querySelector('.popup__close-button_preview');

export default class Card {
  constructor(data, cardSelector) {
    this._image = data.image;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  // забираем разметку из HTML и клонируем элемент
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardTemplate;
  }

  // подготовим карточку к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__heading').textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }

  // открытие предпросмотра изображения
  _handleOpenPreview() {
    previewImage.src = this._image;
    previewCaption.textContent = this._name;
    popupPreview.classList.add('popup_opened');
  }

  // закрытие предпросмотра по клику на крестик
  _handleClosePreview() {
    popupPreview.classList.remove('popup_opened');
  }

  // лайк карточки
  _cardLikeToggle(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  // удаление карточки
  _removeCard(evt) {
    evt.target.closest('.card').remove();
  }

  // слушатели кликов
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPreview();
    })
    previewCloseButton.addEventListener('click', () => {
      this._handleClosePreview();
    })
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._cardLikeToggle(evt);
    })
    this._element.querySelector('.card__remove-button').addEventListener('click', (evt) => {
      this._removeCard(evt);
    })
  }
}
