// класс вставляет элемент в разметку
export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer; // колбэк для слабого связывания
    this._container = containerSelector;
  }

  // обходит массив, для каждого элемента создаёт экземпляр карточки
  renderItems(items) {
    items.forEach(item => {
      this._renderer({
        likes: item.likes,
        _id: item._id,
        name: item.name,
        link: item.link,
        owner: item.owner._id,
        ownerId: item.owner._id
      })
    });
  }

  // добавляет элемент в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
