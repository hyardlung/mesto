// Открытие/закрытие окна popup
let profileEditButtonNode = document.querySelector('.button-edit');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close');

profileEditButtonNode.addEventListener('click', togglePopupVisibility);
popupCloseButtonNode.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
  popupNode.classList.toggle('popup_opened');
}


// Редактирование имени и описания в профиле
let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('#name');
  let jobInput = document.querySelector('#description');
  let profileNameNode = document.querySelector('.profile__name');
  let profileDescriptionNode = document.querySelector('.profile__descr');

  profileNameNode.textContent = nameInput.value;
  profileDescriptionNode.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
