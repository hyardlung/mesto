export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.image;
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
    this._element.querySelector('.card__heading').textContent = this._name;
    this._element.querySelector('.card__image').src = this._image;
    // Вернём элемент наружу
    return this._element;
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
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._cardLikeToggle(evt);
    })
    this._element.querySelector('.card__remove-button').addEventListener('click', (evt) => {
      this._removeCard(evt);
    })
  }
}
