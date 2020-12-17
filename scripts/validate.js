const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

// показать красный нижний бордер при ошибке валидации инпута
const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');

}

// скрыть тот же бордер при пройденной валидации
const hideInputError = (element) => {
  element.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
}

// проверка валидности поля
const isValid = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
}

//отмена стандартного поведения формы
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
})

//проверяем инпуты при вводе символов
formInput.addEventListener('input', isValid);
