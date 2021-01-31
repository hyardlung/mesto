import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  };

  // метод открывающий предпросмотр изображения
  open(evt) { // передаём event в метод
    const currentImage = evt.target.closest('.card__image');  // вяжемся по event.target на картинку карточки
    const previewImage = this._popup.querySelector('.preview__image');  // превьюшная картинка
    const previewCaption = this._popup.querySelector('.preview__caption');  // превьюшная подпись
    previewImage.src = currentImage.src;  // в src превьюшной картинки кладём src картинки, попавшей в event.target
    previewImage.alt = currentImage.alt;  // то же проделываем с альтом
    previewCaption.textContent = currentImage.alt;  // и с подписью
    super.open();
  };
}
