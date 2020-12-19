const formElement = document.querySelector('.popup__form');

// показать красный нижний бордер и текст при ошибке валидации инпута
function showInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(config.inputInvalidClass);
}

// скрыть тот же бордер и текст ошибки при пройденной валидации
function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  input.classList.remove(config.inputInvalidClass);
}

// проверка валидности поля
function isValid(checkForm, checkInput, config) {
  if (!checkInput.validity.valid) {
    showInputError(checkForm, checkInput, config)
  } else {
    hideInputError(checkForm, checkInput, config);
  }
}

// проверка состояния кнопки submit
function setButtonState(button, isActive, config) {
  if (!isActive) {
    button.classList.add(config.buttonInvalidClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.buttonInvalidClass);
    button.disabled = false;
  }
}

// валидация формы
function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  // слушатель с проверкой валидности для каждого импута
  inputList.forEach(currentInput => {
    currentInput.addEventListener('input', () => {
      isValid(form, currentInput, config);
      setButtonState(submitButton, form.checkValidity(), config);
    })
  })
}


// применение валидации к открытой форме
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    setEventListener(form, config);

    // сброс дефолтного поведения
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // проверка состояния кнопки при открытии формы
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  });
}

// конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__save-button_invalid'
}

enableValidation(validationConfig)
