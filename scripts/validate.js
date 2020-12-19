const formElement = document.querySelector('.popup__form');

// показать красный нижний бордер и текст при ошибке валидации инпута
function showInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add('popup__input_state_invalid');
}

// скрыть тот же бордер и текст ошибки при пройденной валидации
function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  input.classList.remove('popup__input_state_invalid');
}

// проверка валидности поля
function isValid(checkForm, checkInput) {
  if (!checkInput.validity.valid) {
    showInputError(checkForm, checkInput)
  } else {
    hideInputError(checkForm, checkInput);
  }
}

// проверка состояния кнопки submit
function setButtonState(button, isActive) {
  if (!isActive) {
    button.classList.add('popup__save-button_invalid');
    button.disabled = true;
  } else {
    button.classList.remove('popup__save-button_invalid');
    button.disabled = false;
  }
}

// валидация формы
function setEventListener(form) {
  const inputList = form.querySelectorAll('.popup__input');
  const submitButton = form.querySelector('.popup__save-button');
  // слушатель с проверкой валидности для каждого импута
  inputList.forEach(currentInput => {
    currentInput.addEventListener('input', (evt) => {
      isValid(form, currentInput);
      setButtonState(submitButton, form.checkValidity());
    })
  })
}

// сброс дефолтного поведения
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

setEventListener(formElement)
