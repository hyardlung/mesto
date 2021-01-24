import {openPopup} from '../pages/index.js'

const popupPreview = document.querySelector('.popup_preview');
const previewImage = popupPreview.querySelector('.preview__image');
const previewCaption = popupPreview.querySelector('.preview__caption');

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.image;
    this._cardSelector = cardSelector;
  }

  // метод забирающий разметку из HTML и клонирующий элемент
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardTemplate;
  }

  // метод открывающий предпросмотр изображения
  _handleOpenPreview() {
    previewImage.src = this._image;
    previewImage.alt = this._name;
    previewCaption.textContent = this._name;
    openPopup(popupPreview);
  }

  // метод установки/снятия лайка карточки
  _cardLikeToggle(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  // метод удаления карточки
  _removeCard(evt) {
    evt.target.closest('.card').remove();
  }

  // слушатели кликов
  _setEventListeners() {

    // слушатель клика по картинке карточки
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPreview();
    });

    // слушатель клика по кнопке лайка
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._cardLikeToggle(evt);
    });

    // слушатель клика по корзине (кнопке удаления карточки)
    this._element.querySelector('.card__remove-button').addEventListener('click', (evt) => {
      this._removeCard(evt);
    })
  }

  // метод генерирующий карточку и готовящий её к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавим данные
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__heading').textContent = this._name;

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }
}
