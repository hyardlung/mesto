import './index.css';

import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  validationConfig,
  EditProfileElement,
  popupFormEditProfile,
  profileName,
  profileAbout,
  nameInput,
  aboutInput,
  addCardElement,
  popupFormAddCard,
  cardNameInput,
  cardImageInput,
  addCardButton,
  profileEditButton,
  popupPreview,
  cardTemplate,
  cardsContainerElement
} from '../utils/constants.js';

const fullsizePreview = new PopupWithImage(popupPreview);
const userProfileInfo = new UserInfo(profileName, profileAbout);

const AddCardFormValidation = new FormValidator(validationConfig, popupFormAddCard);
const EditProfileFormValidation = new FormValidator(validationConfig, popupFormEditProfile);

// функция для получения карточки (чтобы не дублировать код в экземплярах классов)
const createCard = (item) => {
  const card = new Card({
    card: item,
    handleOpenPreview: () => fullsizePreview.open(card)
  }, cardTemplate);
  return card
}

// экземпляр класса Section, рендерящий массив дефолтных карточек на страницу
const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    },
  },
  cardsContainerElement
);

// экземпляр класса PopupWithForm, отвечает за сбор данных из инпутов и вывод карточки на страницу
const popupAddCard = new PopupWithForm({
  popupSelector: addCardElement,
  handleForm: () => {
    const card = createCard({image: cardImageInput.value, name: cardNameInput.value});
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
    popupAddCard.close();
  }
});

// экземпляр класса PopupWithForm, собирает данные из инпутов попапа редактирования профиля и выводит информацию о пользователе на страницу
const popupEditProfile = new PopupWithForm({
  popupSelector: EditProfileElement,
  handleForm: () => {
    userProfileInfo.setUserInfo(nameInput, aboutInput);
    popupEditProfile.close();
  }
})

// листнер кнопки добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

// листнер кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  const userData = userProfileInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  popupEditProfile.open();
});

fullsizePreview.setEventListeners();
defaultCardList.renderItems();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
AddCardFormValidation.enableValidation();
EditProfileFormValidation.enableValidation();

