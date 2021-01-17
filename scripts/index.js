import { initialCards } from './constants/initial-cards.js'
import Card from './components/Card.js'

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupPreview = document.querySelector('.popup_preview');

const previewImage = popupPreview.querySelector('.preview__image');
const previewCaption = popupPreview.querySelector('.preview__caption');

const popupCloseButtons = [...document.querySelectorAll('.popup__close-button')];

const nameInput = document.querySelector('.popup__input[name="profileName"]');
const aboutInput = document.querySelector('.popup__input[name="profileAbout"]');
const cardNameInput = document.querySelector('.popup__input[name="cardName"]');
const cardImageInput = document.querySelector('.popup__input[name="cardImage"]');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const addCardButton = document.querySelector('.profile__add-button');
const popupFormAddCard = document.querySelector('.popup__form_add-card');

const cardsContainerElement = document.querySelector('.elements__list');


initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__list').append(cardElement);
})

// открытие предпросмотра изображения
/* TODO: картинка, по которой производится клик, открывается в попапе предпросмотра,
*   но описание под картинкой не подтягивается из cardHeading.
*   Нужно разобраться, почему туда попадает undefined и как это исправить
*/
function handleOpenPreview() {
  const cardHeadings = [...document.querySelectorAll('.card__heading')];
  const cardImages = [...document.querySelectorAll('.card__image')];
  cardImages.forEach((cardImage) => {
    cardImage.addEventListener('click', (evt) => {
      previewImage.src = cardImage.src;
      previewImage.alt = cardImage.alt;
      previewCaption.textContent = cardHeadings.textContent;
      openPopup(popupPreview);
    });
  })
}

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

// сброс полей попапа добавления карточки на значения по умолчанию
function resetPopupForm() {
  popupFormAddCard.reset();
}

// инициализация попапа добавления карточки
function initAddNewCardPopup() {
  addCardButton.addEventListener('click', () => {
    resetPopupForm();
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
  resetPopupForm();
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
function openPopup(popup) {
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

formElement.addEventListener('submit', handleEditProfileFormSubmit);
popupFormAddCard.addEventListener('submit', handleAddCardFormSubmit);

initEditProfilePopup();
initAddNewCardPopup();
handleOpenPreview();
