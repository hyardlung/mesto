// Открытие/закрытие окна popup
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

profileEditButton.addEventListener('click', togglePopupVisibility);
popupCloseButton.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
  popup.classList.toggle('popup_opened');
}


// Редактирование имени и описания в профиле
let popupForm = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('#name');
  let aboutInput = document.querySelector('#description');
  let profileName = document.querySelector('.profile__name');
  let profileAbout = document.querySelector('.profile__about');

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

popupForm.addEventListener('submit', formSubmitHandler);
