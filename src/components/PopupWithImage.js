import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popup.querySelector('.preview__image');
    this._previewCaption = this._popup.querySelector('.preview__caption');
  };

  open(card) {
    this._previewImage.src = card._image;
    this._previewImage.alt = card._name;
    this._previewCaption.textContent = card._name;
    super.open();
  };
}
