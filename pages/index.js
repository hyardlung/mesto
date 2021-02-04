import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  // validationConfig,
  EditProfileElement,
  // popupFormEditProfile,
  // nameInput,
  // aboutInput,
  addCardElement,
  // popupFormAddCard,
  cardNameInput,
  cardImageInput,
  addCardButton,
  profileEditButton,
  popupPreview,
  cardTemplate,
  cardsContainerElement
} from '../utils/constants.js';



const fullsizePreview = new PopupWithImage(popupPreview);
fullsizePreview.setEventListeners();

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
defaultCardList.renderItems();

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
popupAddCard.setEventListeners();

// // экземпляр класса PopupWithForm, собирает данные из инпутов попапа редактирования профиля и выводит информацию о пользователе на страницу
// const popupEdit = new PopupWithForm({
//   popupSelector: EditProfileElement,
//   handleFormSubmit: ({inputName, inputJob}) => {
//     return userProfileInfo.setUserInfo({inputName, inputJob});
//   }
// })
// popupEdit.setEventListeners();
//
// const userProfileInfo = new UserInfo({profileName, profileAbout});













// const editProfileFormValidity = new FormValidator(validationConfig, popupFormEditProfile);
// const addCardFormValidity = new FormValidator(validationConfig, popupFormAddCard);

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

// листнер кнопки добавления карточки
addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

// profileEditButton.addEventListener('click', () => {
//   popupEdit.open();
//   console.log(popupEdit.popupSelector);
// });

// editProfileFormValidity.enableValidation();
// addCardFormValidity.enableValidation();

