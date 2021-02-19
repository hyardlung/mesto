import './index.css';

import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';

import {
  validationConfig,
  EditProfileElement,
  popupFormEditProfile,
  profileName,
  profileAbout,
  avatarImage,
  nameInput,
  aboutInput,
  addCardElement,
  popupFormAddCard,
  cardNameInput,
  cardImageInput,
  addCardButton,
  profileEditButton,
  confirmDeleteElement,
  updateAvatarElement,
  popupFormUpdateAvatar,
  popupPreview,
  cardTemplate,
  cardsContainerElement,
  updateAvatarSubmitButton,
} from '../utils/constants.js';

let user = null;

const fullsizePreview = new PopupWithImage(popupPreview);
const userProfileInfo = new UserInfo(profileName, profileAbout, avatarImage);
const confirmDelete = new PopupConfirmDelete(confirmDeleteElement);

const addCardFormValidation = new FormValidator(validationConfig, popupFormAddCard);
const editProfileFormValidation = new FormValidator(validationConfig, popupFormEditProfile);
const updateAvatarFormValidation = new FormValidator(validationConfig, popupFormUpdateAvatar);

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
    handleOpenPreview: () => fullsizePreview.open(card),
    deleteHandler: () => {
      confirmDelete.setEventListeners(removeCard(card));
      confirmDelete.open();
    },
    setLike: () => {
      api.setLike(card.returnCardId())
        .then(res => card.changeLikeCounter(res.likes.length))
        .catch(err => console.log(err))
    },
    removeLike: () => {
      api.removeLike(card.returnCardId())
        .then(res => card.changeLikeCounter(res.likes.length))
        .catch(err => console.log(err))
    }
  },
    cardTemplate);
  return card
}

// функция для удаление карточки с сервера
const removeCard = (card) => {
  return () => {
    api.deleteCard(card.returnCardId())
      .then(() => {
        confirmDelete.close();
        card.removeCard();
      })
      .catch(err => console.log(err))
  }
}

// функция для отображения процесса обработки запросов на сервер
const renderLoading = (popupSelector, isLoading) => {
  const saveButton = document.querySelector(popupSelector).querySelector('.popup__save-button');
  if(isLoading) {
    saveButton.textContent = 'Сохранение...'
  } else {
    if (popupSelector === '.popup_add-card') {
      saveButton.textContent = 'Создать'
    } else {
      saveButton.textContent = 'Сохранить'
    }
  }
}

// инстанс класса Section, рендерящий массив дефолтных карточек на страницу
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
    renderLoading('.popup_add-card', true);
    const apiNewCard = api.sendCard({
      name: cardNameInput.value,
      link: cardImageInput.value
    });
    apiNewCard
      .then(data => {
        const card = createCard(data, data.owner._id);
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
        renderLoading('.popup_add-card', false);
        popupAddCard.close();
      })
      .catch(err => console.log(err))
  }
});

/* инстанс класса PopupWithForm: форма тянет данные в инпуты с сервера,
   отправляет обратно новые данные */
const popupEditProfile = new PopupWithForm({
  popupSelector: EditProfileElement,
  handleForm: () => {
    renderLoading('.popup_edit-profile', true);
    api
      .editUserData({
        name: nameInput.value,
        about: aboutInput.value
      })
      .then(data => {
        userProfileInfo.setUserInfo(data);
        renderLoading('.popup_edit-profile', false);
        popupEditProfile.close();
      })
      .catch(err => console.log(err))
    }
})

// инстанс класса PopupWithForm: попап для обновления аватара
const popupUpdateAvatar = new PopupWithForm({
  popupSelector: updateAvatarElement,
  handleForm: () => {
    renderLoading('.popup_update-avatar', true);
    api
      .updateAvatar(popupUpdateAvatar.returnInputValues())
      .then((res) => {
        userProfileInfo.setUserInfo(res);
        renderLoading('.popup_update-avatar', false);
        popupUpdateAvatar.close();
      })
      .catch(err => console.log(err))
    }
})

// листнер кнопки добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

// листнер кнопки редактирования аватара
updateAvatarSubmitButton.addEventListener('click', () => {
  popupUpdateAvatar.open();
})

// листнер кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
    const userData = userProfileInfo.getUserInfo();
    userProfileInfo.saveUserInfo(userData, nameInput, aboutInput);
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    popupEditProfile.open();
});


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
  .catch(err => console.log(err));

fullsizePreview.setEventListeners();
popupAddCard.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupEditProfile.setEventListeners();
addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();
updateAvatarFormValidation.enableValidation();

