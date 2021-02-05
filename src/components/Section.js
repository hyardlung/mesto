// класс вставляет элемент в разметку
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer; // колбэк для слабого связывания
    this._container = containerSelector;
  }

  // обходит массив, для каждого элемента создаёт экземпляр карточки, вызывает addItem
  renderItems() {
    this._initialArray.forEach(item => this._renderer(item));
  }

  // добавляет элемент в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
