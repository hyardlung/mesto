// Открытие/закрытие окна popup
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

let nameInput = document.querySelector('.popup__input[name="profileName"]');
let aboutInput = document.querySelector('.popup__input[name="profileAbout"]');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

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

renderList();
