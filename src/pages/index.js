import './index.css';

import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
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

let user = null;


const fullsizePreview = new PopupWithImage(popupPreview);
const userProfileInfo = new UserInfo(profileName, profileAbout);

const AddCardFormValidation = new FormValidator(validationConfig, popupFormAddCard);
const EditProfileFormValidation = new FormValidator(validationConfig, popupFormEditProfile);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: 'b71f6995-cb82-42c3-9d3d-27eb5d0d8016',
    'Content-Type': 'application/json'
  }
})

// функция для создания карточки (чтобы не дублировать код в экземплярах классов)
const createCard = (item, user) => {
  const card = new Card(item, user, {
    handleOpenPreview: () => fullsizePreview.open(card)
  }, cardTemplate);
  return card
}

// экземпляр класса Section, рендерящий массив дефолтных карточек на страницу
const defaultCardList = new Section({
    renderer: (item) => {
      const card = createCard(item, user);
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    }
  },
  cardsContainerElement
);

/* инстанс класса PopupWithForm: форма отправляет серверу запрос
   на добавление карточки и генерирует её же на страницу */
const popupAddCard = new PopupWithForm({
  popupSelector: addCardElement,
  handleForm: () => {
    const apiNewCard = api.sendCard({
      name: cardNameInput.value,
      link: cardImageInput.value
    });
    apiNewCard.then(data => {
      const card = createCard(data, data.owner._id);
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
      popupAddCard.close();
    })
  }
});

/* инстанс класса PopupWithForm: форма тянет данные в инпуты с сервера,
   отправляет обратно новые данные */
const popupEditProfile = new PopupWithForm({
  popupSelector: EditProfileElement,
  handleForm: () => {
    const apiEditProfile = api.editUserData({
      name: nameInput.value,
      about: aboutInput.value
    });
    apiEditProfile.then(data => {
      userProfileInfo.setUserInfo(data);
      popupEditProfile.close();
    })
  }
})

// листнер кнопки добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

// листнер кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  const apiProfile = api.getUserData();
  apiProfile.then(data => {
    const userData = userProfileInfo.getUserInfo(data);
    userProfileInfo.saveUserInfo(userData, nameInput, aboutInput);
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    popupEditProfile.open();
  })
});

fullsizePreview.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
AddCardFormValidation.enableValidation();
EditProfileFormValidation.enableValidation();

Promise.all([
  api.getUserData(),
  api.getRemoteCards()
]).then(values => {
  const [userData, remoteCards] = values;
  userProfileInfo.getUserInfo(userData);
  userProfileInfo.setUserInfo(userData);

  user = userData;
  defaultCardList.renderItems(remoteCards.reverse());
})
