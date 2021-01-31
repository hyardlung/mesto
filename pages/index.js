import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  initialCards,
  validationConfig,
  // popupEditProfile,
  popupFormEditProfile,
  // nameInput,
  // aboutInput,
  // profileName,
  // profileAbout,
  // popupAddCard,
  popupFormAddCard,
  // cardNameInput,
  // cardImageInput,
  // addCardButton,
  // cardTemplate,
  cardsContainerElement
} from '../utils/constants.js';

const editProfileFormValidity = new FormValidator(validationConfig, popupFormEditProfile);
const addCardFormValidity = new FormValidator(validationConfig, popupFormAddCard);

const fullsizePreview = new PopupWithImage('.popup_preview');
fullsizePreview.setEventListeners();

// экземпляр класса Section, рендерящий массив дефолтных карточек на страницу
const defaultCardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card({
        card: cardItem,
        handleOpenPreview: (evt) => fullsizePreview.open(evt)
      }, '.elements__template');
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    },
  },
  cardsContainerElement
);

// // инициализация попапа добавления карточки
// function initAddNewCardPopup() {
//   addCardButton.addEventListener('click', () => {
//     popupFormAddCard.reset();
//     openPopup(popupAddCard);
//   });
// }
//
// // добавление новых карточек
// function addNewCard() {
//   const cardName = cardNameInput.value;
//   const cardImage = cardImageInput.value;
//   const card = new Card({name: cardName, image: cardImage}, '.elements__template');
//   const cardElement = card.generateCard();
//   cardsContainerElement.prepend(cardElement);
//   popupFormAddCard.reset();
// }
//
// // подтверждение создания карточки
// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();
//   addNewCard();
//   closePopup(popupAddCard);
// }
//
// // инициализация попапа редактирования профиля
// function initEditProfilePopup() {
//   const profileEditButton = document.querySelector('.profile__edit-button');
//   profileEditButton.addEventListener('click', () => {
//   popupFormEditProfile.reset();
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;
//   openPopup(popupEditProfile);
//   });
// }
//
// // сохранение данных в профиле
// function handleEditProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileAbout.textContent = aboutInput.value;
//   closePopup(popupEditProfile);
// }
//
// // открытие попапа
// export function openPopup(popup) {
//   document.addEventListener('keydown', closeByPressingEscape);
//   document.addEventListener('click', closeByClickingOverlay);
//   popup.classList.add('popup_opened');
// }
//
// // закрытие попапа
// function closePopup(popup) {
//   document.removeEventListener('keydown', closeByPressingEscape);
//   document.removeEventListener('click', closeByClickingOverlay);
//   popup.classList.remove('popup_opened');
// }
//
// // закрытие попапа по нажатию на Esc
// function closeByPressingEscape(evt) {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }
//
// закрытие попапа по клику мимо окна
// function closeByClickingOverlay(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }
//
// // обработчик клика по крестику
// popupCloseButtons.forEach((closeButton) => {
//   closeButton.addEventListener('click', function (evt) {
//     closePopup(evt.target.closest('.popup'));
//   });
// })

// popupFormEditProfile.addEventListener('submit', handleEditProfileFormSubmit);
// popupFormAddCard.addEventListener('submit', handleAddCardFormSubmit);


defaultCardList.renderItems();
// initEditProfilePopup();
// initAddNewCardPopup();
editProfileFormValidity.enableValidation();
addCardFormValidity.enableValidation();
