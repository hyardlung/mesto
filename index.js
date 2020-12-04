// Открытие/закрытие окна popup
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

const popupAddCard = document.querySelector('.popup_add-card');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_add-card');


let nameInput = document.querySelector('.popup__input[name="profileName"]');
let aboutInput = document.querySelector('.popup__input[name="profileAbout"]');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

const cardNameInput = document.querySelector('.popup__input[name="cardName"]');
const cardLinkInput = document.querySelector('.popup__input[name="cardLink"]');

let popupForm = document.querySelector('.popup__form');

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

function composeCard(item) {
  const newCard = templateCard.content.cloneNode(true);
  const cardHeading = newCard.querySelector('.card__heading');
  const cardImage = newCard.querySelector('.card__image');
  cardHeading.textContent = item.name;
  cardImage.src = item.link;
  return newCard;
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
}

function closeEditProfilePopup() {
  popup.classList.remove('popup_opened');
}

function openAddNewCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

function closeAddNewCardPopup() {
  popupAddCard.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeEditProfilePopup()
}

profileEditButton.addEventListener('click', openEditProfilePopup);
popupCloseButton.addEventListener('click', closeEditProfilePopup);
popupForm.addEventListener('submit', formSubmitHandler);

addCardButton.addEventListener('click', openAddNewCardPopup);
popupAddCardCloseButton.addEventListener('click', closeAddNewCardPopup)

renderList();
