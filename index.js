// Открытие/закрытие окна popup
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

let nameInput = document.querySelector('.popup__input_name');
let aboutInput = document.querySelector('.popup__input_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.add('popup_opened');
  // Сохранение значений profileName и profileAbout в инпуты
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


// Редактирование имени и описания в профиле
let popupForm = document.querySelector('.popup__form');

popupForm.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}
