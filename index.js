const popup = document.querySelector('.popup');
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

const popupForm = document.querySelector('.popup__form');
const popupFormAddCard = document.querySelector('.popup__form_add-card');

const cardsContainerElement = document.querySelector('.elements__list');
const templateCard = document.querySelector('.elements__template');

const initialCards = [
  {
    name: 'Сундуки',
    link: './images/sundki.jpeg'
  },
  {
    name: 'Хаыйракан',
    link: './images/hayirakan.jpeg'
  },
  {
    name: 'Саяно-Шушенская ГЭС',
    link: './images/sayano-shushenskaya-ges.jpg'
  },
  {
    name: 'Ленские столбы',
    link: './images/lenskie-stolby.jpeg'
  },
  {
    name: 'Ергаки',
    link: './images/ergaki.jpg'
  },
  {
    name: 'Курганская пещера',
    link: './images/kungurskaya-peshera.jpeg'
  }
];

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
  cardHeading.textContent = item.name;
  cardImage.src = item.link;

  // лайк карточки
  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', function (evt) {
    const cardLikeToggle = evt.target;
    cardLikeToggle.classList.toggle('card__like-button_active');
  });
  // открытие предпросмотра изображения
  cardImage.addEventListener('click', function () {
    previewCaption.textContent = item.name;
    previewImage.src = item.link;
    popupPreview.classList.add('popup_opened');
  });
  addRemoveListenerToCard(newCard);

  return newCard;
}

// добавление новых карточек
function addNewCard () {
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const addNewCard = composeCard({name: cardName, link: cardLink});
  cardsContainerElement.prepend(addNewCard);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

// открытие попапа добавления карточки
function openAddNewCardPopup() {
  addCardButton.addEventListener('click', function () {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    popupAddCard.classList.add('popup_opened');
  });
}

// подтверждение создания карточки
function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  addNewCard();
  popupAddCard.classList.remove('popup_opened');
}

// удаление карточки
function removeCard(evt) {
  const targetCard = evt.target.closest('.card');
  targetCard.remove();
}

// обработчик события удаления карточки
function addRemoveListenerToCard(item) {
  const removeButton = item.querySelector('.card__remove-button');
  removeButton.addEventListener('click', removeCard);
}

// открытие попапа редактирования профиля
function openEditProfilePopup() {
  const profileEditButton = document.querySelector('.profile__edit-button');
  profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
  });
}

// сохранение данных в профиле
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// обработчик клика по крестику
popupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
})

popupForm.addEventListener('submit', formSubmitHandler);
popupFormAddCard.addEventListener('submit', formSubmitHandlerAddCard);

renderList();
openEditProfilePopup();
openAddNewCardPopup();
