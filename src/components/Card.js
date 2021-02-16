export default class Card {
  constructor(data, {handleOpenPreview}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleOpenPreview = handleOpenPreview;
    this._cardSelector = cardSelector;
  }

  // метод забирающий разметку из HTML и клонирующий элемент
  _getTemplate() {
    const cardTemplate = this._cardSelector
      .content
      .querySelector('.card')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardTemplate;
  }

  // метод установки/снятия лайка карточки
  _cardLikeToggle(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  // метод удаления карточки
  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  // метод генерирующий карточку и готовящий её к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // Добавим данные
    this._cardImage = this._element.querySelector('.card__image');
    this._cardCaption = this._element.querySelector('.card__heading');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  // слушатели кликов
  _setEventListeners() {
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__like-button');
    this._remove = this._element.querySelector('.card__remove-button');

    // слушатель клика по картинке карточки
    this._cardImage.addEventListener('click', () => {this._handleOpenPreview(this._element)});

    // слушатель клика по кнопке лайка
    this._cardLike.addEventListener('click', (evt) => {this._cardLikeToggle(evt)});

    // слушатель клика по корзине (кнопке удаления карточки)
    this._remove.addEventListener('click', (evt) => {this._removeCard(evt)})
  }
}
