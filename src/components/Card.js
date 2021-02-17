export default class Card {
  constructor(data, user, {handleOpenPreview}, cardSelector) {
    // this._likes = data.likes;
    // this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._user = user;
    // this._owner = data.owner;
    this._ownerId = data.ownerId;
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

  /* метод для проверки хозяина карточки и показа/скрытия иконки удаления карточки
   в зависимости от результата проверки */
  _showTrashCan() {
    this._removeButton = this._element.querySelector('.card__remove-button');
    if (this._ownerId === this._user._id) {
      console.log(this._ownerId)
      console.log(this._user._id)

      this._removeButton.classList.add('card__remove-button_active');
      // слушатель клика по корзине (кнопке удаления карточки)
      this._removeButton.addEventListener('click', (evt) => {this._removeCard(evt)})
    } else {
      this._removeButton.remove();
      this._removeButton = null;
    }
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
    this._showTrashCan();
    // Вернём элемент наружу
    return this._element;
  }

  // слушатели кликов
  _setEventListeners() {
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__like-button');

    // слушатель клика по картинке карточки
    this._cardImage.addEventListener('click', () => {this._handleOpenPreview(this._element)});

    // слушатель клика по кнопке лайка
    this._cardLike.addEventListener('click', (evt) => {this._cardLikeToggle(evt)});


  }
}
