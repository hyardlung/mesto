import Popup from './Popup';

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmDeleteButton = document.querySelector('.popup__save-button_confirmation');
  }

  setEventListeners(deleteCard) {
    super.setEventListeners();
    this._handleButtonConfirm = deleteCard;
    this._confirmDeleteButton.addEventListener('click', this._handleButtonConfirm);
  }

  close() {
    super.close();
    this._confirmDeleteButton.removeEventListener('click', this._handleButtonConfirm);
  }
}
