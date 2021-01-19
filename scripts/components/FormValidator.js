export default class FormValidator {
  constructor(setOfValidationsParams, formElement) {
    this._setOfValidationsParams = setOfValidationsParams;
    this._formElement = formElement;
  }

  // показать красный нижний бордер и текст при ошибке валидации инпута
  _showInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._setOfValidationsParams.inputInvalidClass);
  }

  // скрыть тот же бордер и текст ошибки при пройденной валидации
  _hideInputError(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._setOfValidationsParams.inputInvalidClass);
  }

  // проверка валидности поля
  _isValid(checkForm, checkInput) {
    if (!checkInput.validity.valid) {
      this._showInputError(checkForm, checkInput)
    } else {
      this._hideInputError(checkForm, checkInput);
    }
  }

  // проверка состояния кнопки submit
  _setButtonState(button, isActive) {
    if (!isActive) {
      button.classList.add(this._setOfValidationsParams.buttonInvalidClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._setOfValidationsParams.buttonInvalidClass);
      button.disabled = false;
    }
  }

  // валидация формы
  _setEventListener(form) {
    const inputList = form.querySelectorAll(this._setOfValidationsParams.inputSelector);
    const submitButton = form.querySelector(this._setOfValidationsParams.submitButtonSelector);
    // слушатель с проверкой валидности для каждого импута
    inputList.forEach(currentInput => {
      currentInput.addEventListener('input', () => {
        this._isValid(form, currentInput);
        this._setButtonState(submitButton, form.checkValidity());
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
