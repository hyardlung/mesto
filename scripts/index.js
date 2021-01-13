import { initialCards } from './constants/initial-cards.js'
import Card from './components/Card.js'

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');

const popupCloseButtons = [...document.querySelectorAll('.popup__close-button')];

const nameInput = document.querySelector('.popup__input[name="profileName"]');
const aboutInput = document.querySelector('.popup__input[name="profileAbout"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const addCardButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__input[name="cardName"]');
const cardLinkInput = document.querySelector('.popup__input[name="cardLink"]');

const popupFormAddCard = document.querySelector('.popup__form_add-card');

const cardsContainerElement = document.querySelector('.elements__list');

// первоначальный рендер списка карточек
// function renderList() {
//   const cardsList = initialCards.map(composeCard);
//   cardsContainerElement.append(...cardsList);
// }

// // генерация карточки из шаблона
// function composeCard(item) {
//   const newCard = templateCard.content.cloneNode(true);
//   const cardHeading = newCard.querySelector('.card__heading');
//   const cardImage = newCard.querySelector('.card__image');
//   const cardLikeButton = newCard.querySelector('.card__like-button');
//   cardHeading.textContent = item.name;
//   cardImage.alt = item.name;
//   cardImage.src = item.link;

//   // открытие предпросмотра изображения
//   cardImage.addEventListener('click', function () {
//     previewCaption.textContent = item.name;
//     previewImage.alt = item.name;
//     previewImage.src = item.link;
//     openPopup(popupPreview);
//   });

//   cardLikeButton.addEventListener('click', likeCard);
//   addRemoveListenerToCard(newCard);

//   return newCard;
// }

// // сброс полей попапа добавления карточки на значения по умолчанию
// function resetPopupForm() {
//   popupFormAddCard.reset();
// }

// // добавление новых карточек
// function addNewCard () {
//   const cardName = cardNameInput.value;
//   const cardLink = cardLinkInput.value;
//   const addNewCard = composeCard({name: cardName, link: cardLink});
//   cardsContainerElement.prepend(addNewCard);
//   resetPopupForm();
// }

// // инициализация попапа добавления карточки
// function initAddNewCardPopup() {
//   addCardButton.addEventListener('click', function () {
//     resetPopupForm();
//     openPopup(popupAddCard);
//   });
// }

// // подтверждение создания карточки
// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();
//   addNewCard();
//   closePopup(popupAddCard);
// }

// // удаление карточки
// function removeCard(evt) {
//   const targetCard = evt.target.closest('.card');
//   targetCard.remove();
// }

// // лайк карточки
// function likeCard(evt) {
//   const cardLikeToggle = evt.target;
//   cardLikeToggle.classList.toggle('card__like-button_active');
// }

// // обработчик события удаления карточки
// function addRemoveListenerToCard(item) {
//   const removeButton = item.querySelector('.card__remove-button');
//   removeButton.addEventListener('click', removeCard);
// }

// // инициализация попапа редактирования профиля
// function initEditProfilePopup() {
//   const profileEditButton = document.querySelector('.profile__edit-button');
//   profileEditButton.addEventListener('click', function () {
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;
//   openPopup(popupEditProfile);
//   });
// }

// // сохранение данных в профиле
// function handleEditProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileAbout.textContent = aboutInput.value;
//   closePopup(popupEditProfile);
// }

// // открытие попапа
// function openPopup(popup) {
//   document.addEventListener('keydown', closeByPressingEscape);
//   document.addEventListener('click', closeByClickingOverlay);
//   popup.classList.add('popup_opened');
// }

// // закрытие попапа
// function closePopup(popup) {
//   document.removeEventListener('keydown', closeByPressingEscape);
//   document.removeEventListener('click', closeByClickingOverlay);
//   popup.classList.remove('popup_opened');
// }

// // закрытие попапа по нажатию на Esc
// function closeByPressingEscape(evt) {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }

// // закрытие попапа по клику мимо окна
// function closeByClickingOverlay(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     const activePopup = document.querySelector('.popup_opened');
//     closePopup(activePopup);
//   }
// }

// // обработчик клика по крестику
// popupCloseButtons.forEach((closeButton) => {
//   closeButton.addEventListener('click', function (evt) {
//     closePopup(evt.target.closest('.popup'));
//   });
// })

// formElement.addEventListener('submit', handleEditProfileFormSubmit);
// popupFormAddCard.addEventListener('submit', handleAddCardFormSubmit);

// initEditProfilePopup();
// initAddNewCardPopup();


initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').append(cardElement);
})
