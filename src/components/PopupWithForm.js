import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleForm}) {
    super(popupSelector);
    this._handleForm = handleForm;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
  }

  // метод собирает данные всех полей формы
  _getInputValues() {   // достаём все элементы полей
    this._formValues = {};  // создаём пустой объект
    this._inputList.forEach(input => {  // добавляем в этот объект значения всех полей
      this._formValues[input.name] = input.value;
    });

    return this._formValues;  // возвращаем объект значений
  }

  // метод закрывает форму и сбрасывает инпуты
  close() {
    this._formElement.reset();
    super.close();
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._handleForm(this._getInputValues());
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  }
};
