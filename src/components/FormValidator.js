export default class FormValidator {
  constructor(setOfValidationParams, formElement) {
    this._setOfValidationParams = setOfValidationParams;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(this._setOfValidationParams.submitButtonSelector);
  }

  // метод для проверки валидности поля
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  // метод отображающий красный нижний бордер и текст при ошибке валидации инпута
  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._setOfValidationParams.inputInvalidClass);
  }

  // метод скрывающий красный нижний бордер и текст ошибки при пройденной валидации
  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._setOfValidationParams.inputInvalidClass);
  }

  // метод меняющий состояние кнопки submit в зависимости от того, пройдена ли валидация
  _setButtonState() {
    if (!this._formElement.checkValidity()) {
      this._submitButton.classList.add(this._setOfValidationParams.buttonInvalidClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._setOfValidationParams.buttonInvalidClass);
      this._submitButton.disabled = false;
    }
  }

  // метод слушателей
  _setEventListener() {
    const inputList = this._formElement.querySelectorAll(this._setOfValidationParams.inputSelector);

    // слушатель с проверкой валидности для каждого импута
    inputList.forEach(currentInput => {
      currentInput.addEventListener('input', () => {
        this._isValid(currentInput);
        this._setButtonState();
      });
    });
    // слушатель сброса инпутов, ошибок валидации и состояния кнопки
    this._formElement.addEventListener('reset', () => {
      inputList.forEach((input) => {
        this._hideInputError(input);
        this._setButtonState();
      });
    });
  }

  // метод, включающий валидацию на экземпляре класса
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener(this._formElement);
    this._setButtonState();
  }
}
