export default class FormValidator {
  constructor(setOfValidationsParams, formElement) {
    this._setOfValidationsParams = setOfValidationsParams;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(this._setOfValidationsParams.submitButtonSelector);
  }

  // показать красный нижний бордер и текст при ошибке валидации инпута
  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._setOfValidationsParams.inputInvalidClass);
  }

  // скрыть тот же бордер и текст ошибки при пройденной валидации
  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._setOfValidationsParams.inputInvalidClass);
  }

  // проверка валидности поля
  _isValid(checkInput) {
    if (!checkInput.validity.valid) {
      this._showInputError(checkInput);
    } else {
      this._hideInputError(checkInput);
    }
  }

  // проверка состояния кнопки submit
  _setButtonState() {
    if (!this._formElement.checkValidity()) {
      this._submitButton.classList.add(this._setOfValidationsParams.buttonInvalidClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._setOfValidationsParams.buttonInvalidClass);
      this._submitButton.disabled = false;
    }
  }

  // валидация формы
  _setEventListener() {
    const inputList = this._formElement.querySelectorAll(this._setOfValidationsParams.inputSelector);
    // слушатель с проверкой валидности для каждого импута
    inputList.forEach(currentInput => {
      currentInput.addEventListener('input', () => {
        this._isValid(currentInput);
        this._setButtonState();
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListener(this._formElement);
  }
}
