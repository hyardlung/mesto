//переменные для изображений
const sunduki = new URL ('../images/sundki.jpeg', import.meta.url);
const khayyrakan = new URL ('../images/khayyrakan.jpeg', import.meta.url);
const sshges = new URL ('../images/sayano-shushenskaya-ges.jpg', import.meta.url);
const lenskieStolby = new URL ('../images/lenskie-stolby.jpeg', import.meta.url);
const ergaki = new URL ('../images/ergaki.jpg', import.meta.url);
const kungurskayaPeshera = new URL ('../images/kungurskaya-peshera.jpeg', import.meta.url);

// массив объектов с данными дефолтных карточек
export const initialCards = [
  {name: 'Сундуки', image: sunduki},
  {name: 'Хайыракан', image: khayyrakan},
  {name: 'Саяно-Шушенская ГЭС', image: sshges},
  {name: 'Ленские столбы', image: lenskieStolby},
  {name: 'Ергаки', image: ergaki},
  {name: 'Курганская пещера', image: kungurskayaPeshera}
];

// конфиг валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__save-button_invalid'
}

export const EditProfileElement = document.querySelector('.popup_edit-profile');
export const popupFormEditProfile = EditProfileElement.querySelector('.popup__form_edit-profile');
export const nameInput = popupFormEditProfile.querySelector('.popup__input[name="profileName"]');
export const aboutInput = popupFormEditProfile.querySelector('.popup__input[name="profileAbout"]');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

export const addCardElement = document.querySelector('.popup_add-card');
export const popupFormAddCard = addCardElement.querySelector('.popup__form_add-card');
export const cardNameInput = popupFormAddCard.querySelector('.popup__input[name="cardName"]');
export const cardImageInput = popupFormAddCard.querySelector('.popup__input[name="cardImage"]');

export const addCardButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');

export const popupPreview = document.querySelector('.popup_preview');

export const cardTemplate = document.querySelector('.elements__template');

export const cardsContainerElement = document.querySelector('.elements__list');
