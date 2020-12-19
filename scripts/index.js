const activePopup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupPreview = document.querySelector('.popup_preview');
const popupCloseButtons = [...document.querySelectorAll('.popup__close-button')];

const nameInput = document.querySelector('.popup__input[name="profileName"]');
const aboutInput = document.querySelector('.popup__input[name="profileAbout"]');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const addCardButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__input[name="cardName"]');
const cardLinkInput = document.querySelector('.popup__input[name="cardLink"]');

const previewImage = popupPreview.querySelector('.preview__image');
const previewCaption = popupPreview.querySelector('.preview__caption');

const popupFormAddCard = document.querySelector('.popup__form_add-card');

const cardsContainerElement = document.querySelector('.elements__list');
const templateCard = document.querySelector('.elements__template');

// первоначальный рендер списка карточек
function renderList() {
  const cardsList = initialCards.map(composeCard);
  cardsContainerElement.append(...cardsList);
}

// генерация карточки из шаблона
function composeCard(item) {
  const newCard = templateCard.content.cloneNode(true);
  const cardHeading = newCard.querySelector('.card__heading');
  const cardImage = newCard.querySelector('.card__image');
  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardHeading.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  // открытие предпросмотра изображения
  cardImage.addEventListener('click', function () {
    previewCaption.textContent = item.name;
    previewImage.alt = item.name;
    previewImage.src = item.link;
    popupPreview.classList.add('popup_opened');
  });

  cardLikeButton.addEventListener('click', likeCard);
  addRemoveListenerToCard(newCard);

  return newCard;
}

// сброс полей попапа добавления карточки на значения по умолчанию
function resetPopupForm() {
  popupFormAddCard.reset();
}

// добавление новых карточек
function addNewCard () {
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const addNewCard = composeCard({name: cardName, link: cardLink});
  cardsContainerElement.prepend(addNewCard);
  resetPopupForm();
}

// инициализация попапа добавления карточки
function initAddNewCardPopup() {
  addCardButton.addEventListener('click', function () {
    resetPopupForm();
    openPopup(popupAddCard);
  });
}

// подтверждение создания карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
}

// удаление карточки
function removeCard(evt) {
  const targetCard = evt.target.closest('.card');
  targetCard.remove();
}

// лайк карточки
function likeCard(evt) {
  const cardLikeToggle = evt.target;
  cardLikeToggle.classList.toggle('card__like-button_active');
}

// обработчик события удаления карточки
function addRemoveListenerToCard(item) {
  const removeButton = item.querySelector('.card__remove-button');
  removeButton.addEventListener('click', removeCard);
}

// инициализация попапа редактирования профиля
function initEditProfilePopup() {
  const profileEditButton = document.querySelector('.profile__edit-button');
  profileEditButton.addEventListener('click', function () {
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
function openPopup(activePopup) {
  activePopup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup(activePopup) {
  activePopup.classList.remove('popup_opened');
}

// обработчик клика по крестику
popupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
})

formElement.addEventListener('submit', handleEditProfileFormSubmit);
popupFormAddCard.addEventListener('submit', handleAddCardFormSubmit);

renderList();
initEditProfilePopup();
initAddNewCardPopup();
