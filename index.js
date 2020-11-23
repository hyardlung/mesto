// Открытие/закрытие окна popup
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

let nameInput = document.querySelector('.popup__input_name');
let aboutInput = document.querySelector('.popup__input_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let popupForm = document.querySelector('.popup__form');


function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup()
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', formSubmitHandler);
