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
export const profileName = '.profile__name';
export const profileAbout = '.profile__about';

export const addCardElement = document.querySelector('.popup_add-card');
export const popupFormAddCard = addCardElement.querySelector('.popup__form_add-card');
export const cardNameInput = popupFormAddCard.querySelector('.popup__input[name="cardName"]');
export const cardImageInput = popupFormAddCard.querySelector('.popup__input[name="cardImage"]');

export const addCardButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');

export const confirmDeleteElement = document.querySelector('.popup_confirm-delete');

export const popupPreview = document.querySelector('.popup_preview');
export const cardTemplate = document.querySelector('.elements__template');
export const cardsContainerElement = document.querySelector('.elements__list');
