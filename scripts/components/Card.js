

export default class Card {
  constructor({card, handleOpenPreview}, cardSelector) {
    this._name = card.name;
    this._image = card.image;
    this._handleOpenPreview = handleOpenPreview;
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

  // // метод открывающий предпросмотр изображения         TODO: перенести в index.js, сделать функцией, которая передаётся параметром в конструктор чтобы избавиться от кольцевого импорта
  // _handleOpenPreview() {
  //   previewImage.src = this._image;
  //   previewImage.alt = this._name;
  //   previewCaption.textContent = this._name;
  //   openPopup(popupPreview);
  // }

  // метод установки/снятия лайка карточки
  _cardLikeToggle(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  // метод удаления карточки
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  // слушатели кликов
  _setEventListeners() {

    // слушатель клика по картинке карточки
    this._element.querySelector('.card__image').addEventListener('click', (evt) => {
      this._handleOpenPreview(evt);
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
