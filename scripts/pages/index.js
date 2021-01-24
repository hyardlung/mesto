import { validationConfig } from '../constants/validation-config.js'
import { initialCards } from '../constants/initial-cards.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js'

const popupCloseButtons = [...document.querySelectorAll('.popup__close-button')];

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const nameInput = popupFormEditProfile.querySelector('.popup__input[name="profileName"]');
const aboutInput = popupFormEditProfile.querySelector('.popup__input[name="profileAbout"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const popupAddCard = document.querySelector('.popup_add-card');
const popupFormAddCard = popupAddCard.querySelector('.popup__form_add-card');
const cardNameInput = popupFormAddCard.querySelector('.popup__input[name="cardName"]');
const cardImageInput = popupFormAddCard.querySelector('.popup__input[name="cardImage"]');

const addCardButton = document.querySelector('.profile__add-button');

const cardsContainerElement = document.querySelector('.elements__list');


const editProfileFormValidity = new FormValidator(validationConfig, popupFormEditProfile);
const addCardFormValidity = new FormValidator(validationConfig, popupFormAddCard);

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template');
  const cardElement = card.generateCard();
  cardsContainerElement.append(cardElement);
})

// сброс полей попапа добавления карточки на значения по умолчанию
function resetPopupFormAddCard() {
  popupFormAddCard.reset();
}

// инициализация попапа добавления карточки
function initAddNewCardPopup() {
  addCardButton.addEventListener('click', () => {
    resetPopupFormAddCard();
    openPopup(popupAddCard);
  });
}

// добавление новых карточек
function addNewCard() {
  const cardName = cardNameInput.value;
  const cardImage = cardImageInput.value;
  const card = new Card({name: cardName, image: cardImage}, '.elements__template');
  const cardElement = card.generateCard();
  cardsContainerElement.prepend(cardElement);
  resetPopupFormAddCard();
}

// подтверждение создания карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
}

// инициализация попапа редактирования профиля
function initEditProfilePopup() {
  const profileEditButton = document.querySelector('.profile__edit-button');
  profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEditProfile);
  });
}

// сохранение данных в профиле
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

// открытие попапа
export function openPopup(popup) {
  document.addEventListener('keydown', closeByPressingEscape);
  document.addEventListener('click', closeByClickingOverlay);
  popup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup(popup) {
  document.removeEventListener('keydown', closeByPressingEscape);
  document.removeEventListener('click', closeByClickingOverlay);
  popup.classList.remove('popup_opened');
}

// закрытие попапа по нажатию на Esc
function closeByPressingEscape(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// закрытие попапа по клику мимо окна
function closeByClickingOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// обработчик клика по крестику
popupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
})

popupFormEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
popupFormAddCard.addEventListener('submit', handleAddCardFormSubmit);

initEditProfilePopup();
initAddNewCardPopup();
editProfileFormValidity.enableValidation();
addCardFormValidity.enableValidation();
