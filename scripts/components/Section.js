import Card from './Card.js';

// класс вставляет элемент в разметку
export default class Section {
  constructor({items}, containerSelector) {
    this._initialArray = items;
    this._container = containerSelector;
  }

  // обходит массив, для каждого элемента создаёт экземпляр карточки, вызывает addItem
  renderItems() {
    this._initialArray.forEach((item) => {
      const card = new Card(item, '.elements__template');
      const cardElement = card.generateCard();
      this.addItem(cardElement);
    });
  }

  // добавляет элемент в контейнер
  addItem(element) {
    this._container.append(element);
  }
}
